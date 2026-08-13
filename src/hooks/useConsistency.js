import { useState, useEffect, useRef } from "react";

export default function useConsistency(timer, initialTime, isFocus, isFinished, correctKeyStrokes) {
    const [consistency, setConsistency] = useState(0);
    const wpmSampleRef = useRef([]);

    useEffect(() => {
        if (!isFocus || isFinished) return;

        const elapsedSeconds = initialTime - timer;
        if (elapsedSeconds < 0) return;

        const elapsedMinutes = elapsedSeconds / 60;
        const instantWpm = (correctKeyStrokes / 5) / elapsedMinutes;

        wpmSampleRef.current = [...wpmSampleRef.current, instantWpm];
    }, [timer]);

    useEffect(() => {
        if (!isFinished) return;

        const samples = wpmSampleRef.current;
        if (samples.length === 0) {
            setConsistency(0);
            return;
        }

        const mean = samples.reduce((sum, val) => sum + val, 0) / samples.length;
        const squaredDiffs = samples.map((val) => (val - mean) ** 2);
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / samples.length;
        const standardDeviation = Math.sqrt(variance);

        const cv = mean === 0 ? 0 : (standardDeviation / mean) * 100;
        const result = Math.max(0, 100 - cv);

        setConsistency(Math.round(result));
    }, [isFinished]);

    function restartConsistency() {
        wpmSampleRef.current = [];
        setConsistency(0);
    }

    return { consistency, restartConsistency };
}