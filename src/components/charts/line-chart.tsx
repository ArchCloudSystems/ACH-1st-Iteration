"use client"

import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface LineChartProps {
  data: Array<{
    date: string
    value: number
  }>
}

export const LineChart = ({ data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3659B1" />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}