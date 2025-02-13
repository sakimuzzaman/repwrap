"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// const data = [
//   {
//     name: "Jan",
//     total: 167,
//   },
//   {
//     name: "Feb",
//     total: 145,
//   },
//   {
//     name: "Mar",
//     total: 189,
//   },
//   {
//     name: "Apr",
//     total: 156,
//   },
//   {
//     name: "May",
//     total: 171,
//   },
//   {
//     name: "Jun",
//     total: 190,
//   },
//   {
//     name: "Jul",
//     total: 185,
//   },
// ]

export function Overview({ monthly_work_data }: any) {
  // console.log(monthly_work_data, '');

  const data = monthly_work_data;
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}h`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

