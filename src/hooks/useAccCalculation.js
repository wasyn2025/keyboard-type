import { useState } from "react";

export default function useAccCalculation() {
    const [acc, setAcc] = useState(0);
    const [totalKeyStrokes, setTotalKeyStrokes] = useState(0);
    const [correctKeyStrokes, setCorrectKeyStrokes] = useState(0);

    function calculateAcc(correctKeyStrokes, totalKeyStrokes) {
        if (totalKeyStrokes === 0) return 0;

        return Math.round((correctKeyStrokes / totalKeyStrokes) * 100);
    }

    function restartAccState() {
        setTotalKeyStrokes(0);
        setCorrectKeyStrokes(0);
        setAcc(0);
    }

    return {
        acc, setAcc,
        totalKeyStrokes, setTotalKeyStrokes,
        correctKeyStrokes, setCorrectKeyStrokes,

        calculateAcc,
        restartAccState
    }
}