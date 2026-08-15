import { useState, useRef, useEffect } from 'react'
import { Earth, RotateCcw, Keyboard, SettingsIcon, Play, Pause, Palette } from 'lucide-react';
import { generate, count } from "random-words";
import * as Util from './util/util.js';
import * as config from './util/config.js';

// Heyyy, i'm you from the past :D

import Word from './components/Word.jsx';
import Caret from './components/Caret.jsx';
import SmallButton from './components/SmallButton.jsx';
import Timer from './components/Timer.jsx';
import HiddenInputBox from './components/HiddenInputBox.jsx';
import TestSettingWrapper from './components/TestSettingWrapper.jsx';
import FinishInterfaceWrapper from './components/FinishInterfaceWrapper.jsx';

import useTimer from './hooks/useTimer.js';
import useCaretFeature from './hooks/useCaretFeature.js';
import useNewLineFeature from './hooks/useNewLineFeature.js';
import useTypingState from './hooks/useTypingState.js';
import useWpmCalculation from './hooks/useWpmCalculation.js';
import useAccCalculation from './hooks/useAccCalculation.js';
import useConsistency from './hooks/useConsistency.js';
import useTypingSetting from './hooks/useTypingSetting.js';

export default function App() {
  const {
    typingMode, setTypingMode,
    testDuration, setTestDuration,
    testWordAmount, setTestWordAmount,
  } = useTypingSetting();

  const {
    words, setWords,
    teks, setTeks,
    kataAktifIndex, setKataAktifIndex,
    teksHistory, setTeksHistory,
    isFocus, setIsFocus,
    isFinished, setIsFinished,
    isPaused, setIsPaused,
    inputBoxRef,

    handleSpace,
    handlePause,
    restartTypingState
  } = useTypingState(testWordAmount);

  const {
    caretPosition,
    setCaretPosition,
    containerRef,
    restartCaretState
  } = useCaretFeature(
    teks,
    kataAktifIndex
  );

  const {
    offsetGeser,
    setOffsetGeser,
    setPosisiBarisPertama,
    setTinggiBaris,
    restartNewLineState
  } = useNewLineFeature(
    kataAktifIndex,
    containerRef
  );

  const {
    timer,
    setTimer,
    timerIntervalIdRef,
    stopTimer,
    handleTimerOver,
    restartTimerState
  } = useTimer(
    testDuration,
    isFocus,
    isPaused,
    () => {
      setIsFocus(false);
      setIsFinished(true);
      setIsPaused(false);
      restartCaretState();
    }
  );

  const {
    wpm,
    setWpm,
    calculateCorrectChars,
    calculateWpm,
    restartWpmState
  } = useWpmCalculation(teksHistory, words);

  const {
    acc, setAcc,
    totalKeyStrokes, setTotalKeyStrokes,
    correctKeyStrokes, setCorrectKeyStrokes,
    calculateAcc,
    restartAccState
  } = useAccCalculation();

  const {
    consistency,
    restartConsistency
  } = useConsistency(
    timer,
    config.DEFAULT_TIMER,
    isFocus,
    isFinished,
    correctKeyStrokes
  );

  useEffect(() => {
    if (isFinished === true) {
      const correctChars = calculateCorrectChars(teksHistory, words);
      const elapsedSeconds = config.DEFAULT_TIMER - timer;
      const wpmResult = calculateWpm(correctChars, elapsedSeconds);
      const accResult = calculateAcc(correctKeyStrokes, totalKeyStrokes);

      setWpm(wpmResult);
      setAcc(accResult);
    }
  }, [isFinished]);

  function checkIsLastWord(newText) {
    const isLastWord = kataAktifIndex === (words.length - 1);
    const isSameLength = newText.length === words[kataAktifIndex].length;

    if (isSameLength && isLastWord) {
      stopTimer();

      setTeksHistory((previousTextHistory) => [...previousTextHistory, newText.toLowerCase()]);
      setKataAktifIndex((previousWordIndex) => previousWordIndex + 1);
      setTeks('');
      setIsFinished(true);
      setIsFocus(false);
      setIsPaused(false);
    }
  }

  function handleTyping(event) {
    if (isFinished === false && isPaused === false) {
      const newText = event.target.value;

      if (Util.limitTyping(newText, kataAktifIndex, containerRef) === false) {
        if (newText.length > teks.length) {
          const newCharIndex = newText.length - 1;
          const typedChar = newText[newCharIndex];
          const targetChar = words[kataAktifIndex][newCharIndex];

          setTotalKeyStrokes((prevTotal) => prevTotal + 1);
          if (typedChar === targetChar) {
            setCorrectKeyStrokes((prevCorrect) => prevCorrect + 1);
          }
        }

        setTeks(newText);
        setIsFocus(true);

        checkIsLastWord(newText);
      }
    }
  }

  function handleRestart() {
    stopTimer();

    restartTypingState();
    restartTimerState();
    restartCaretState();
    restartNewLineState();
    restartWpmState();
    restartAccState();
    restartConsistency();
    
    setWords(generate(
      typingMode === config.TYPING_MODE.time ? 
      config.WORDS_AMOUNT[3] :
      testWordAmount
    ));
  }

  return (
    <div className='relative w-5/6 mx-auto h-full flex flex-col gap-y-25' onClick={() => inputBoxRef.current.focus()}>

      <HiddenInputBox
        ref={inputBoxRef}
        value={teks}
        onChange={(event) => handleTyping(event)}
        onKeyDown={handleSpace}
      />

      <div className=''>
        <div className='mb-4 flex items-center font-general-sans justify-between'>
          <div className='w-full flex items-center text-shade-white gap-2'>
            <Keyboard size={34} className='text-(--main-color)' />
            <h1 className='text-3xl font-medium'>keyboardtype</h1>
          </div>
          <span id='theme' className={`${isFocus ? 'invisible' : 'visible'} whitespace-nowrap transition-opacity duration-500 w-fit mx-auto flex items-center gap-2 text-(--text-color) text-sm cursor-pointer py-1 px-2 rounded-md hover:bg-white/10`}>
            <Palette size={16} />
            Gruvbox Dark
          </span>
          <span id='language' className={`${isFocus ? 'invisible' : 'visible'} whitespace-nowrap transition-opacity duration-500 w-fit mx-auto flex items-center gap-2 text-(--text-color) text-sm cursor-pointer py-1 px-2 rounded-md hover:bg-white/10`}>
            <Earth size={16} />
            English
          </span>
        </div>
        <TestSettingWrapper data={{
          isFocus: isFocus,
          isFinished: isFinished,
          typingModeList: config.TYPING_MODE,
          testDurationList: config.TEST_DURATION,
          wordsAmountList: config.WORDS_AMOUNT,
          typingMode: typingMode,
          testDuration: testDuration,
          testWordAmount: testWordAmount,
          setTypingMode: setTypingMode,
          setTestDuration: setTestDuration,
          setTestWordAmount: setTestWordAmount,
          setTimer: setTimer,
          setWords: setWords,
        }} />
      </div>

      <div className='grow'>
        <div className='w-full'>
          <div className='w-full relative'>
            <Timer
              timer={Util.formatTimer(timer)}
              extraClass={`${isFocus ? 'visible' : 'invisible'}`}
            />
          </div>

          {isFinished ? (
            <FinishInterfaceWrapper data={{
              wpm: wpm,
              acc: acc,
              accSuffix: '%',
              consistency: consistency,
              consistencySuffix: '%',
              time: Util.convertElapsedTime(testDuration - timer),
              timeSuffix: Util.handleElapsedTimeSuffix(testDuration - timer),
              testWordAmount: `${testWordAmount} words, english`,
              elapsedTime: Util.formatTimer(testDuration - timer, false)
            }} />
          ) : (
            <div className='relative mb-8 h-38 overflow-hidden'>
              <div
                ref={containerRef}
                className='transition-transform duration-300 relative select-none text-[2.5rem] leading-none font-rowan flex flex-wrap gap-x-3 gap-y-3'
                style={{ transform: `translateY(-${offsetGeser}px)` }}
              >
                <Caret isFocus={isFocus} caretPosition={caretPosition} />
                {
                  words.map((kata, kataIndex) => (
                    <Word
                      key={kataIndex}
                      kata={kata}
                      dataWordIndex={kataIndex}
                      teksUntukDibandingkan={
                        kataIndex === kataAktifIndex ?
                          teks : kataIndex < kataAktifIndex ?
                            teksHistory[kataIndex] : ''
                      }
                      isPassed={teksHistory[kataIndex] || false}
                    />
                  ))
                }
              </div>
            </div>
          )}

          <div className='w-full flex justify-center gap-2'>
            <SmallButton onClick={handleRestart}>
              <RotateCcw size={22} />
            </SmallButton>
            {
              isFocus ?
                isPaused === false ? (
                  <SmallButton
                    onClick={handlePause}
                    extraClass={`${isFocus ? 'visible' : 'invisible'}`}
                  >
                    <Pause size={22} />
                  </SmallButton>
                ) : (
                  <SmallButton
                    onClick={handlePause}
                    extraClass={`${isFocus ? 'visible' : 'invisible'}`}
                  >
                    <Play size={22} />
                  </SmallButton>
                )
                : ''
            }
          </div>
        </div>
      </div>
    </div>
  );
}
