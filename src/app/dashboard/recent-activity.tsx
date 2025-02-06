"use client"

import { Card } from "@/components/ui/card"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Activity, AlertTriangle, CheckCircle } from "lucide-react"

interface RecentActivityProps {
  user: User
}

export const RecentActivity = ({ user }: RecentActivityProps) => {
  const { data: activities } = useQuery({
    queryKey: ["recent-activities"],
    queryFn: async () => {
      const res = await fetch("/api/activities")
      return res.json()
    }
  })

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">Recent Activity</h3>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities?.map((activity: any) => (
          <div key={activity.id} className="flex items-start gap-4">
            {activity.type === "alert" ? (
              <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
            )}
            <div>
              <p className="text-sm font-medium">{activity.message}</p>
              <p className="text-xs text-gray-500">
                {format(new Date(activity.timestamp), "MMM d, yyyy HH:mm")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}