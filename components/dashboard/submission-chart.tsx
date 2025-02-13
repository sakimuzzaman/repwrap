"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


export function SubmissionChart({ submission_rate_over_week }: any) {
  // console.log(submission_rate_over_week, 'submission_rate_over_week');

  // const data = [
  //   { name: 'Monday', submissions: 85 },
  //   { name: 'Tuesday', submissions: 90 },
  //   { name: 'Wednesday', submissions: 95 },
  //   { name: 'Thursday', submissions: 88 },
  //   { name: 'Friday', submissions: 92 },
  //   { name: 'Saturday', submissions: 85 },
  //   { name: 'Sunday', submissions: 89 },
  // ]
  const data = submission_rate_over_week;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Submission Rate Over The Past Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

