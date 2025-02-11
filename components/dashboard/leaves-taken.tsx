import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image';

const leavesTaken = [
  {
    name: "Izazul Islam",
   // avatar: "/avatars/01.png",
    initials: "II",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
  {
    name: "Izazul Islam",
    //avatar: "/avatars/02.png",
    initials: "II",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
  {
    name: "John Doe",
   // avatar: "/avatars/03.png",
    initials: "JD",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
  {
    name: "Izazul Islam",
   // avatar: "/avatars/04.png",
    initials: "II",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
  {
    name: "Hasan Joy",
   // avatar: "/avatars/05.png",
    initials: "HJ",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
  {
    name: "John Doe",
   // avatar: "/avatars/06.png",
    initials: "JD",
    imageSrc: "/img001.png", 
    alt: "Izazul Islam's Avatar"
  },
]

export function LeavesTaken() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Leaves Taken Yesterday
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Total Number of People on Leave: 6
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {leavesTaken.map((person, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Avatar className="h-12 w-12">
              <Image 
                  src={person.imageSrc} 
                  alt={person.name + "'s avatar"}  
                  width={45} 
                  height={38} 
                />
                {/* <AvatarImage src={person.avatar} /> */}
                {/* <AvatarFallback>{person.initials}</AvatarFallback> */}
              </Avatar>
              <p className="text-xs text-center">{person.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

