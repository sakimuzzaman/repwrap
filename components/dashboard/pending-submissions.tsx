import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image';

const pendingSubmissions = [
  {
    name: "Izazul Islam",
    // avatar: "/avatars/01.png",
    initials: "II",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
  {
    name: "Arif Khan",
    avatar: "/avatars/02.png",
    initials: "AK",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
  {
    name: "Shahed Alam",
    avatar: "/avatars/03.png",
    initials: "SA",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
  {
    name: "Sabbir",
    avatar: "/avatars/04.png",
    initials: "S",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
]

export function PendingSubmissions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Yesterday's Pending Submissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingSubmissions.map((user) => (
            <div key={user.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                <Image 
                  src={user.imageSrc} 
                  alt={user.name + "'s avatar"}  
                  width={32} 
                  height={32} 
                />
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" className="text-blue-700 border border-blue-700">
                View Profile
              </Button>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
            See More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

