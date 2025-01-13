"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OnboardingPage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl">Invite Teammates to <br />  your workspace</CardTitle>
       
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-center">
                  Teammate Email address
          </h2>
          <Input
            placeholder="Enter email address or paste multiple"
            className="text-center"
          />
        </div>

        <div className="flex justify-center gap-3">
            <Button className="w-[124px]" size="lg">
                 Continue
            </Button>

            <Button className="w-[124px] bg-gray-400" size="lg" >
                  Skip
            </Button>

        </div>
        
      </CardContent>
    </Card>
  )
}

