import { useState } from "react";
import * as config from '../util/config.js';

export default function useTypingSetting() {
    const [typingMode, setTypingMode] = useState(() => config.TYPING_MODE.time);
    const [testDuration, setTestDuration] = useState(() => config.TEST_DURATION[2]);
    const [testWordAmount, setTestWordAmount] = useState(() => config.WORDS_AMOUNT[3])
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