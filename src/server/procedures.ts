import { db } from "@/db"
import { j } from "./__internals/j"
import { getServerSession } from "next-auth"
import { HTTPException } from "hono/http-exception"
import { authOptions } from "@/lib/auth"
import { rateLimiter } from "@/lib/rate-limit"

const rateLimitMiddleware = j.middleware(async ({ c, next }) => {
  const ip = c.req.header("x-forwarded-for") || "unknown"
  await rateLimiter.consume(`${ip}:${c.req.path}`)
  return next()
})

const authMiddleware = j.middleware(async ({ c, next }) => {
  const authHeader = c.req.header("Authorization")

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1]

    const user = await db.user.findUnique({
      where: { apiKey },
      include: { organization: true },
    })

    if (user) return next({ user })
  }

  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { organization: true },
  })

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  return next({ user })
})

export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure
export const privateProcedure = publicProcedure
  .use(rateLimitMiddleware)
  .use(authMiddleware)