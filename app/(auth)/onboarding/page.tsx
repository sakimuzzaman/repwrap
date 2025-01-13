"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OnboardingPage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl">Welcome To Repwrap!</CardTitle>
        <p className="text-muted-foreground">
          You Are Signing As Tushar.Ahmed566@Gmail.Com
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-center">
            What Would You Like To Name Your Workspace?
          </h2>
          <Input
            placeholder="Try The Name Of Your Company Or Organisation"
            className="text-center"
          />
        </div>
        <Button className="w-full" size="lg">
          Continue
        </Button>
      </CardContent>
    </Card>
  )
}

