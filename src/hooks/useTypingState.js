import { useState, useRef, useEffect } from 'react'
import { generate } from "random-words";
import { DEFAULT_GENERATED_WORD } from '../util/config.js';

export default function useTypingState({ testWordAmount, typingMode, typingModeList, incrementCurrentWord }) {
    const [isInfiniteWord, setIsInfiniteWord] = useState(() => typingMode === typingModeList.time ? true : false);
    const [words, setWords] = useState(() => determineWordAmount());

    const [teks, setTeks] = useState('');
    const [kataAktifIndex, setKataAktifIndex] = useState(0);
    const [teksHistory, setTeksHistory] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const inputBoxRef = useRef(null);

    useEffect(() => inputBoxRef.current.focus(), []);

    function determineWordAmount() {
        if (typingMode === typingModeList.time && isInfiniteWord === true) {
            return generate(DEFAULT_GENERATED_WORD);
        }

        return generate(testWordAmount);
    }

    function handleSpace(event) {
        if (event.key === ' ' && isPaused === false) {
            event.preventDefault();

            if (teks.length !== 0 && isFinished === false && kataAktifIndex !== (words.length - 1)) {
                setTeksHistory((previousTextHistory) => [...previousTextHistory, teks.toLowerCase()]);
                setKataAktifIndex((previousWordIndex) => previousWordIndex + 1);
                incrementCurrentWord((prevIndex) => prevIndex + 1);
                setTeks('');
            }
        }
    }

    function handlePause() {
        setIsPaused(prev => !prev);
    }

    function restartTypingState() {
        setWords(() => determineWordAmount());
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
        isInfiniteWord, setIsInfiniteWord,
        inputBoxRef,

        handlePause,
        handleSpace,
        restartTypingState
    }
}