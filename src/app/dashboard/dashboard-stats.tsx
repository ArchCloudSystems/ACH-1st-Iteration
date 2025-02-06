"use client"

import { Card } from "@/components/ui/card"
import { User } from "@prisma/client"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"

interface DashboardStatsProps {
  user: User & {
    organization: any
    EventCategories: any[]
  }
}

export const DashboardStats = ({ user }: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Events by Category</h3>
        <div className="h-[300px]">
          <BarChart
            data={user.EventCategories.map(cat => ({
              name: cat.name,
              value: cat._count.events
            }))}
          />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Event Trends</h3>
        <div className="h-[300px]">
          <LineChart
            data={[
              { date: "2024-01", value: 100 },
              { date: "2024-02", value: 150 },
              { date: "2024-03", value: 180 }
            ]}
          />
        </div>
      </Card>
    </div>
  )
}