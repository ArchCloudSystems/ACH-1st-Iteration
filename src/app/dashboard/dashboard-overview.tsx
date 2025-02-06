"use client"

import { Card } from "@/components/ui/card"
import { User } from "@prisma/client"
import { BarChart, Cloud, Shield } from "lucide-react"

interface DashboardOverviewProps {
  user: User & {
    organization: any
    EventCategories: any[]
  }
}

export const DashboardOverview = ({ user }: DashboardOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Cloud className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Active Services</p>
            <p className="text-2xl font-semibold">{user.EventCategories.length}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <BarChart className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Events</p>
            <p className="text-2xl font-semibold">
              {user.EventCategories.reduce((acc, cat) => acc + cat._count.events, 0)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Shield className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Plan</p>
            <p className="text-2xl font-semibold">{user.plan}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}