"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";

export function WeekDays({ onDateChange }: { onDateChange: (date: string) => void }) {
    const [lastTenDays, setLastTenDays] = useState<{
        day: string;
        date: string;
        fullDate: Date;
    }[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    function getLastTenDays() {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize time to midnight
        const dayShortNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const lastTen = [];

        for (let i = 7; i >= 0; i--) { // Start from 9 days ago to today
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - i);

            lastTen.push({
                day: dayShortNames[pastDate.getDay()],
                date: String(pastDate.getDate()).padStart(2, "0"),
                fullDate: new Date(pastDate)
            });
        }
        return lastTen;
    }

    useEffect(() => {
        const data = getLastTenDays();
        setLastTenDays(data);
        // Set active index to today (last item in the array)
        setActiveIndex(data.length - 1);
    }, []);

    const handleDateChange = (index: number) => {
        console.log(lastTenDays, index, 'formattedDate');

        const selectedDate = lastTenDays[index];
        const fullDate = selectedDate.fullDate;
        const formattedDate = `${fullDate.getFullYear()}-${String(fullDate.getMonth() + 1).padStart(2, '0')}-${String(fullDate.getDate()).padStart(2, '0')}`;
        console.log(selectedDate, formattedDate, 'fgf');

        

        onDateChange(formattedDate);
        setActiveIndex(index);
    };

    return (
        <div>
            <div className="flex justify-between gap-4 mb-4">
                {lastTenDays.map((day, index) => {
                    const isToday = index === lastTenDays.length - 1;

                    return (
                        <div
                            key={index}
                            onClick={() => handleDateChange(index)}
                            className="cursor-pointer"
                        >
                            <Card
                                className={`relative rounded-2xl transition-all duration-300 ease-in-out 
                                transform ${activeIndex === index
                                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-xl"
                                        : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 shadow-2xl hover:scale-105"
                                    }`}
                            >
                                <CardHeader className="flex flex-col items-center px-8 py-4 space-y-2">
                                    <p className={`${activeIndex === index
                                        ? "text-white"
                                        : "text-gray-600 dark:text-gray-300"} text-md`}>
                                        {day.day}
                                    </p>
                                    <h2 className={`${activeIndex === index
                                        ? "text-white"
                                        : "text-gray-900 dark:text-white"} text-4xl font-bold`}>
                                        {day.date}
                                    </h2>
                                    {isToday && (
                                        <span className="absolute -top-4 text-center p-0.5 px-2 text-xs  bg-white border-2 border-blue-700 rounded-lg text-blue-600">
                                            Today
                                        </span>
                                    )}
                                </CardHeader>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}