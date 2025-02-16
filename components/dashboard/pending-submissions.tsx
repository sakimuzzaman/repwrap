import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image';
import Link from "next/link";

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

export function PendingSubmissions({ yesterday_pending_submissions }: any) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Yesterday's Pending Submissions
        </CardTitle>
      </CardHeader>
      <CardContent>

        <div className="space-y-4">
          {yesterday_pending_submissions?.map((user: any) => {
            // ইউজারের নাম থেকে প্রথম দুটি অক্ষর বের করা
            const initials = user.name
              ? user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()
              : "U"; // যদি নাম না থাকে তাহলে "U" দেখাবে

            return (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    {user.imageSrc ? (
                      <AvatarImage src={user.imageSrc} alt={`${user.name}'s avatar`} />
                    ) : (
                      <img
                        src={`https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`}
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Link href={`/profile/${user.id}`}>
                  <Button variant="outline" size="sm" className="text-blue-700 border border-blue-700">
                    View Profile
                  </Button>
                </Link>
              </div>
            );
          })}
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
            See More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

