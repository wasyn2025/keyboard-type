import { useEffect, useState, useRef } from "react";

export default function useTimer({initialTime, isFocus, isPaused, typingMode, typingModeWord, handleRestart}) {
    const [timer, setTimer] = useState(() => initialTime);
    const timerIntervalIdRef = useRef(null);

    useEffect(() => { handleTimer(); return () => stopTimer(); }, [isFocus, isPaused]);
    useEffect(() => handleTimerOver(), [timer]);

    function handleTimer() {
        if (!isFocus || isPaused === true) return;

        timerIntervalIdRef.current = setInterval(() => {
            if(typingMode === typingModeWord) {
                setTimer((timer) => timer + 1);
                return;
            }

            setTimer((timer) => (timer <= 0 ? 0 : timer - 1));
        }, 1000);
    }

    function handleTimerOver() {
        if (timer <= 0 && isFocus === true && typingMode !== typingModeWord) {
            stopTimer();
            setTimeout(() => handleRestart(), 600);
        }
    }

    function stopTimer() {
        clearInterval(timerIntervalIdRef.current);
    }

    function restartTimerState() {
        timerIntervalIdRef.current = '';
        setTimer(typingMode !== typingModeWord ? initialTime : 0);
    }

    return { timer, setTimer, timerIntervalIdRef, stopTimer, handleTimerOver, restartTimerState };
}