import { DashboardPage } from "@/components/dashboard-page"
import { db } from "@/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { DashboardOverview } from "./dashboard-overview"
import { authOptions } from "@/lib/auth"
import { DashboardStats } from "./dashboard-stats"
import { RecentActivity } from "./recent-activity"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email! },
    include: {
      organization: true,
      EventCategories: {
        include: {
          _count: {
            select: { events: true }
          }
        }
      }
    }
  })

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <DashboardPage title="Dashboard">
      <div className="space-y-8">
        <DashboardOverview user={user} />
        <DashboardStats user={user} />
        <RecentActivity user={user} />
      </div>
    </DashboardPage>
  )
}

export default Page