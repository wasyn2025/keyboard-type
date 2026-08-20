import { useState } from "react";
import * as config from '../util/config.js';

export default function useTypingSetting() {
    const [typingMode, setTypingMode] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('preferences'));
        const typingMode = saved ? saved.typingMode : null;
        return typingMode !== null ? typingMode : config.DEFAULT_PREFERENCE.typingMode;
    });

    const [testDuration, setTestDuration] = useState(() => {
        if (typingMode === config.TYPING_MODE.time) {
            const saved = JSON.parse(localStorage.getItem('preferences'));
            const testDuration = saved ? saved.testDuration : null;
            return testDuration !== null ? testDuration : config.DEFAULT_PREFERENCE.testDuration;
        }

        return 0;
    });

    const [testWordAmount, setTestWordAmount] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('preferences'));
        const wordAmount = saved ? saved.wordAmount : null;
        return wordAmount !== null ? wordAmount : config.DEFAULT_PREFERENCE.wordAmount;
    })
    const [currentWord, setCurrentWord] = useState(() => 0);

    function restartTypingSetting() {
        setTypingMode(config.TYPING_MODE.time);
        setTestDuration(config.TEST_DURATION[2]);
        setTestWordAmount(config.TYPING_MODE[4]);
    }

    function incrementCurrentWord() {
        setCurrentWord((prevIndex) => prevIndex < testWordAmount ? prevIndex + 1 : prevIndex);
    }

    function restartCurrentWord() {
        setCurrentWord(0);
    }

    return {
        typingMode, setTypingMode,
        testDuration, setTestDuration,
        testWordAmount, setTestWordAmount,
        currentWord, incrementCurrentWord, restartCurrentWord
    };
}