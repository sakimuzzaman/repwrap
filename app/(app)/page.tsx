import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, UserPlus } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6 space-y-4">
          <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <BarChart3 className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">
            Expect To See Reports Data Appear Here Soon!
          </h2>
          <p className="text-muted-foreground">
            To Get Report Data Start Building A Project And Invite Teammates To Your Project.
          </p>
          <Button className="w-full max-w-xs mx-auto" size="lg">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Teammates
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

