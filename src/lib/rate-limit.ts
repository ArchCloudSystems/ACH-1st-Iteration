import { db } from "@/db"
import { HTTPException } from "hono/http-exception"

export class RateLimit {
  constructor(
    private readonly points: number,
    private readonly duration: number,
    private readonly blockDuration: number = 0
  ) {}

  async consume(key: string): Promise<void> {
    const now = new Date()
    const rateLimit = await db.rateLimit.findUnique({ where: { key } })

    if (rateLimit) {
      if (rateLimit.expire < now) {
        await db.rateLimit.update({
          where: { key },
          data: {
            points: this.points - 1,
            expire: new Date(now.getTime() + this.duration * 1000),
          },
        })
      } else if (rateLimit.points > 0) {
        await db.rateLimit.update({
          where: { key },
          data: { points: rateLimit.points - 1 },
        })
      } else {
        throw new HTTPException(429, {
          message: "Too Many Requests",
        })
      }
    } else {
      await db.rateLimit.create({
        data: {
          key,
          points: this.points - 1,
          expire: new Date(now.getTime() + this.duration * 1000),
        },
      })
    }
  }
}

export const rateLimiter = new RateLimit(100, 60) // 100 requests per minute