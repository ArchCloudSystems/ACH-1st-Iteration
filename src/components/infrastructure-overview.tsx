"use client"

import { Card } from "./ui/card"
import { LineChart } from "./charts/line-chart"

export const InfrastructureOverview = () => {
  // Sample data for the infrastructure overview
  const metrics = [
    { label: "Active Services", value: "24" },
    { label: "Total Events", value: "1.2k" },
    { label: "Uptime", value: "99.99%" }
  ]

  // Sample data for the line chart
  const chartData = [
    { date: "00:00", value: 65 },
    { date: "04:00", value: 72 },
    { date: "08:00", value: 85 },
    { date: "12:00", value: 78 },
    { date: "16:00", value: 92 },
    { date: "20:00", value: 88 },
  ]

  return (
    <Card className="w-full">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Infrastructure Overview</h3>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Healthy
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 h-48">
          <LineChart data={chartData} />
        </div>
      </div>
    </Card>
  )
}