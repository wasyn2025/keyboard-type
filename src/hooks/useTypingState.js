import { useState, useRef, useEffect } from 'react'
import { generate, count } from "random-words";
import * as config from '../util/config.js';

export function useTypingState() {
    const [words, setWords] = useState(() => generate(config.DEFAULT_GENERATED_WORDS));
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
        handleSpace
    }
}