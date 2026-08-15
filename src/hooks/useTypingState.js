import { useState, useRef, useEffect } from 'react'
import { generate, count } from "random-words";
import * as config from '../util/config.js';

export default function useTypingState(testWordAmount) {
    const [words, setWords] = useState(() => generate(testWordAmount));
    const [teks, setTeks] = useState('');
    const [kataAktifIndex, setKataAktifIndex] = useState(0);
    const [teksHistory, setTeksHistory] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const inputBoxRef = useRef(null);

    useEffect(() => inputBoxRef.current.focus(), []);

    function handleSpace(event) {
        if (event.key === ' ' && isPaused === false) {
            event.preventDefault();

            if (teks.length !== 0 && isFinished === false && kataAktifIndex !== (words.length - 1)) {
                setTeksHistory((previousTextHistory) => [...previousTextHistory, teks.toLowerCase()]);
                setKataAktifIndex((previousWordIndex) => previousWordIndex + 1);
                setTeks('');
            }
        }
    }

    function handlePause() {
        setIsPaused(prev => !prev);
    }

    function restartTypingState() {
        setWords(generate(config.DEFAULT_GENERATED_WORDS));
        setTeks('');
        setKataAktifIndex(0);
        setTeksHistory([]);
        setIsFocus(false);
        setIsFinished(false);
        setIsPaused(false);
    }

    return {
        words, setWords,
        teks, setTeks,
        kataAktifIndex, setKataAktifIndex,
        teksHistory, setTeksHistory,
        isFocus, setIsFocus,
        isFinished, setIsFinished,
        isPaused, setIsPaused,
        inputBoxRef,

        handlePause,
        handleSpace,
        restartTypingState
    }
}