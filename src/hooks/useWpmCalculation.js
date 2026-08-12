import { useState } from "react";

export function useWpmCalculation(teksHistory, words) {
    const [wpm, setWpm] = useState(0);

    function calculateCorrectChars(teksHistory, words) {
        let correctChars = 0;

        for (let i = 0; i < teksHistory.length; i++) {
            const typedWord = teksHistory[i];
            const targetWord = words[i];

            for (let j = 0; j < typedWord.length; j++) {
                if (typedWord[j] === targetWord[j]) {
                    correctChars++;
                }
            }
        }

        return correctChars;
    }

    function calculateWpm(correctChars, elapsedSeconds) {
        const elapsedMinutes = elapsedSeconds / 60;
        if (elapsedMinutes <= 0) return 0;

        return Math.round((correctChars / 5) / elapsedMinutes);
    }

    function restartWpmState() {
        setWpm(0);
    }

    return { wpm, setWpm, calculateCorrectChars, calculateWpm, restartWpmState };
}