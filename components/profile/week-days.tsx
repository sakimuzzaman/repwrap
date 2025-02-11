"use client"

import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"




export function WeekDays() {
    const [thisWeek, setThisWeek] = useState<{ day: string; date: string; selected: boolean; }[]>([]);

    function getThisWeeksDates() {
        const today = new Date();
        const currentDayIndex = today.getDay();
        const startOfWeek = new Date(today);

        // Adjust to get the start of the week (Sunday)
        startOfWeek.setDate(today.getDate() - currentDayIndex);

        const weekDates = [];
        const dayShortNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        for (let i = 0; i < 7; i++) {
            const dayDate = new Date(startOfWeek);
            dayDate.setDate(startOfWeek.getDate() + i);

            weekDates.push({
                day: dayShortNames[dayDate.getDay()],
                date: String(dayDate.getDate()).padStart(2, "0"), // Format date as two digits
                selected: dayDate.toDateString() === today.toDateString(), // Mark today as selected
            });
        }
        return weekDates;
    }

    useEffect(() => {
        setThisWeek(getThisWeeksDates());
    }, []);


    return (
        <Card className="space-y-2 flex justify-between border-none shadow-none mb-4">

            {thisWeek?.map((day, index) => (
                <Card key={index} className={`${day.selected ? "bg-primary text-white dark: bg-blue-600 " : ""}`}> 
                    <CardHeader className="flex flex-row items-center px-6 py-4 justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">
                            <h3 className="hover:underline">
                                {day.date}
                            </h3>
                            <p className="hover:underline">
                                {day.day}
                            </p>
                        </CardTitle>
                    </CardHeader>
                </Card>
            ))}

        </Card>
    )
}

