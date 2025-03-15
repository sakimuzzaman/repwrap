import { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const CustomTimePicker = () => {
    const [time, setTime] = useState("10:00");

    return (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Pick a Time</h2>
            <TimePicker
                onChange={() => setTime}
                value={time}
                disableClock={true}
                className="border p-2 rounded-md"
            />
            <p className="text-gray-600">Selected Time: {time}</p>
        </div>
    );
};

export default CustomTimePicker;
