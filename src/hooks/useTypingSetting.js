import { useState } from "react";
import * as config from '../util/config.js';

export default function useTypingSetting() {
    const [typingMode, setTypingMode] = useState(config.TYPING_MODE.time);
    const [testDuration, setTestDuration] = useState(config.TEST_DURATION[2]);
    const [testWordAmount, setTestWordAmount] = useState(config.WORDS_AMOUNT[3])

    function restartTypingSetting() {
        setTypingMode(config.TYPING_MODE.time);
        setTestDuration(config.TEST_DURATION[2]);
        setTestWordAmount(config.TYPING_MODE[4]);
    }

    return {
        typingMode, setTypingMode,
        testDuration, setTestDuration,
        testWordAmount,setTestWordAmount,
    };
}