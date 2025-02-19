"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";

export function WeekDays({ onDateChange }: { onDateChange: (date: string) => void }) {
    const [lastTenDays, setLastTenDays] = useState<{ day: string; date: string; }[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    function getLastTenDays() {
        const today = new Date();
        const dayShortNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const lastTen = [];

        for (let i = 0; i < 10; i++) {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - i); // Subtract `i` days from today

            lastTen.push({
                day: dayShortNames[pastDate.getDay()],
                date: String(pastDate.getDate()).padStart(2, "0"),
            });
        }
        return lastTen.reverse();
    }

    useEffect(() => {
        const data = getLastTenDays();
        setLastTenDays(data);
        setActiveIndex(9); // Default: latest day (today) active
    }, []);

    const handleDateChange = (index: number) => {
        const selectedDate = lastTenDays[index]; // Get the selected date object
        const today = new Date();
        const year = today.getFullYear();

        // Ensure the selected date has the correct format YYYY-MM-DD
        const formattedDate = `${year}-${String(today.getMonth() + 1).padStart(2, "0")}-${selectedDate.date}`;

        console.log(formattedDate, 'formattedDate'); // Output: YYYY-MM-DD (e.g., 2024-02-19)

        onDateChange(formattedDate); // Pass formatted date to parent
        setActiveIndex(index);
    };


    return (
        <div>
            <div className="flex justify-between gap-4 mb-4">
                {lastTenDays.map((day, index) => (
                    <div
                        key={index}
                        onClick={() => handleDateChange(index)}
                        className="cursor-pointer"
                    >
                        <Card
                            className={`relative rounded-2xl transition-all duration-300 ease-in-out 
                            transform ${activeIndex === index
                                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-xl"
                                    : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 shadow-2xl hover:scale-105 hover:rotate-0"
                                }`}
                        >
                            <CardHeader className="flex flex-col items-center px-8 py-4 space-y-2">
                                <p className={`${activeIndex === index ? "text-white" : "text-gray-600 dark:text-gray-300"} text-lg`}>
                                    {day.day}
                                </p>
                                <h2 className={`${activeIndex === index ? "text-white" : "text-gray-900 dark:text-white"} text-5xl font-bold`}>
                                    {day.date}
                                </h2>
                            </CardHeader>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
