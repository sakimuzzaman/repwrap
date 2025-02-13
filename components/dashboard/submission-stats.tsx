"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

// const data = [
//   { name: "Submitted", value: 95 },
//   { name: "Not Submitted", value: 5 },
// ]

const COLORS = ["#8884d8", "#d4d4d4"]

export function SubmissionStats({ yesterday_submission_percentage }: any) {
  // console.log(yesterday_submission_percentage, 'yesterday_submission_percentage');
  const data = [
    { name: "Submitted", value: yesterday_submission_percentage?.submitted },
    { name: "Not Submitted", value: yesterday_submission_percentage?.not_submitted },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Yesterday's Submission Percentage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span className="text-sm">
                    {value} ({entry?.payload?.value}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          {yesterday_submission_percentage?.submitted_count ?? 0}/ {yesterday_submission_percentage?.total_employees ?? 0 }  Employees Submitted (95%)
        </p>
      </CardContent>
    </Card>
  )
}

