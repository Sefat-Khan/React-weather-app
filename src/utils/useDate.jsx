import { useEffect, useState } from "react";

export default function useDate() {
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [day, setDay] = useState();

    const updateDateTime = () => {
        const locale = 'en';
        const now = new Date();
        
        setDate(now.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'}));
        setDay(now.toLocaleDateString(locale, {weekday: 'long'}));
        setTime(now.toLocaleTimeString(locale, {hour: 'numeric', minute: 'numeric', second: 'numeric'}));
    }

    useEffect(() => {
        updateDateTime();
        const timer = setInterval(() => {
            updateDateTime()
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    },[])

    return {
        date,
        day,
        time
    };


}