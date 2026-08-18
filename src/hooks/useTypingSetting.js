import { useState } from "react";
import * as config from '../util/config.js';

export default function useTypingSetting() {
    const [typingMode, setTypingMode] = useState(() => {
        const saved = localStorage.getItem('preferences');
        const typingMode = saved ? JSON.parse(saved).typingMode : null;
        return typingMode !== null ? typingMode : config.DEFAULT_PREFERENCE.typingMode;
    });

    const [testDuration, setTestDuration] = useState(() => {
        const saved = localStorage.getItem('preferences');
        const testDuration = saved ? JSON.parse(saved).testDuration : null;
        return testDuration !== null ? testDuration : config.DEFAULT_PREFERENCE.testDuration;
    });

    const [testWordAmount, setTestWordAmount] = useState(() => {
        const saved = localStorage.getItem('preferences');
        const wordAmount = saved ? JSON.parse(saved).wordAmount : null;
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
        currentWord, setCurrentWord, incrementCurrentWord, restartCurrentWord
    };
}