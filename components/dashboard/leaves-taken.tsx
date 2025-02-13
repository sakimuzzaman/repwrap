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

export function LeavesTaken({ yesterday_leaves }: any) {
  // console.log(yesterday_leaves, 'yesterday_leaves');
  
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
          {yesterday_leaves?.map((person:any, i:number) => {
            // ইউজারের নাম থেকে প্রথম দুটি অক্ষর বের করা
            const initials = person.name
              ? person.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()
              : "U"; // যদি নাম না থাকে তাহলে "U" দেখাবে

            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <Avatar className="h-12 w-12">
                  {person.imageSrc ? (
                    <Image
                      src={person.imageSrc}
                      alt={`${person.name}'s avatar`}
                      width={45}
                      height={38}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src={`https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`}
                      alt={person.name}
                      width={45}
                      height={38}
                      className="rounded-full"
                    />
                  )}
                </Avatar>
                <p className="text-xs text-center">{person.name}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
}

