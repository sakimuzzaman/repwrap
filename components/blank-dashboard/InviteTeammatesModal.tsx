"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus } from "lucide-react"

interface CreateBlankDashboardProps {
  children: React.ReactNode
}

export function InviteTeammatesModal({ children }: CreateBlankDashboardProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[650px] sm:max-h-[550px]">
        <DialogHeader>
          <DialogTitle className="text-4xl text-center font-semibold  mt-10">Invite Teammates <br /> to 
             your Project</DialogTitle>
          {/* <DialogDescription className="text-center font-medium pt-8">
               Teammate Email address
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-center "> Teammate Email address</Label>
            <Input id="name" placeholder="Enter email address or paste multiple" className="text-center" />
          </div>
          
        </div>
        <DialogFooter>

          
         <Button variant="outline"  size="sm"  onClick={() => setOpen(false)}>
                            
                            Send invitation
            </Button>
           
          {/* <Button type="submit">Invite Teammates</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

