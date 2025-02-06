import { db } from "@/db"
import { User } from "@prisma/client"

export async function auditLog(
  action: string,
  user: User,
  metadata: Record<string, any>
) {
  await db.auditLog.create({
    data: {
      action,
      userId: user.id,
      metadata,
    },
  })
}