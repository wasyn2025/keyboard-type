import { useEffect, useState, useRef } from "react";

export function useTimer(
    initialTime,
    isFocus,
    isPaused,
    setIsFocus,
    setTeks,
    setKataAktifIndex,
    setTeksHistory,
    setIsFinished,
) {
    const [timer, setTimer] = useState(initialTime);
    const timerIntervalIdRef = useRef(null);

    useEffect(() => { handleTimer(); return () => stopTimer(); }, [isFocus, isPaused]);
    useEffect(() => handleTimerOver(), [timer]);

    function handleTimer() {
        if (!isFocus || isPaused === true) return;

        timerIntervalIdRef.current = setInterval(() => {
            setTimer((timer) => (timer <= 0 ? 0 : timer - 1));
        }, 1000);
    }

    function handleTimerOver() {
        if (timer <= 0 && isFocus === true) {
            stopTimer();

            setTimeout(() => {
                setTimer(initialTime);
                setTeks('');
                setKataAktifIndex(0);
                setTeksHistory([]);
                setIsFocus(false);
                setIsFinished(true);
            }, 600);
        }
    }

    function stopTimer() {
        clearInterval(timerIntervalIdRef.current);
    }

    return { timer, setTimer, timerIntervalIdRef, stopTimer, handleTimerOver };
}