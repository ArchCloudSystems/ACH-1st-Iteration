import { db } from "@/db"
import { getServerSession } from "next-auth"
import { router } from "../__internals/router"
import { publicProcedure } from "../procedures"
import { authOptions } from "@/lib/auth"

export const dynamic = "force-dynamic"

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return c.json({ isSynced: false })
    }

    const user = await db.user.findFirst({
      where: { email: session.user.email },
    })

    if (!user) {
      await db.user.create({
        data: {
          quotaLimit: 100,
          email: session.user.email,
          name: session.user.name || undefined,
          image: session.user.image || undefined,
        },
      })
    }

    return c.json({ isSynced: true })
  }),
})