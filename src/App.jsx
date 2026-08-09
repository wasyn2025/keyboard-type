import { useState, useRef, useEffect } from 'react'
import { Earth, AlarmClock, RotateCcw, Keyboard, SettingsIcon, Play, Pause } from 'lucide-react';
import { generate, count } from "random-words";
import * as Util from './util/util.js';
import * as config from './util/config.js';

import Word from './components/Word.jsx';
import Caret from './components/Caret.jsx';
import SmallButton from './components/SmallButton.jsx';

export default function App() {
  const [words] = useState(() => generate(config.DEFAULT_GENERATED_WORDS));
  const [teks, setTeks] = useState('');
  const [kataAktifIndex, setKataAktifIndex] = useState(0);
  const [teksHistory, setTeksHistory] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [timer, setTimer] = useState(config.DEFAULT_TIMER);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [offsetGeser, setOffsetGeser] = useState(0);
  const [posisiBarisPertama, setPosisiBarisPertama] = useState(0);
  const [tinggiBaris, setTinggiBaris] = useState(null);

  const inputBoxRef = useRef(null);
  const timerIntervalIdRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => inputBoxRef.current.focus(), []);
  useEffect(() => { handleTimer(); return () => clearInterval(timerIntervalIdRef.current) }, [isFocus, isPaused]);
  useEffect(() => handleTimerOver(), [timer]);
  useEffect(() => calculateCaretPosition(), [teks, kataAktifIndex]);
  useEffect(() => handleShowingNewLine(), [kataAktifIndex]);

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

  function handleRestart() {
    stopTimer();

    timerIntervalIdRef.current = '';
    setTeks('');
    setKataAktifIndex(0);
    setTeksHistory([]);
    setIsFocus(false);
    setTimer(config.DEFAULT_TIMER);
    setIsFinished(false);
    setIsPaused(false);

    setOffsetGeser(0);
    setPosisiBarisPertama(0);
    setTinggiBaris(null);
  }

  function calculateCaretPosition() {
    const container = containerRef.current;
    if (!container) return;

    const wordElement = container.querySelector(`[data-wordindex="${kataAktifIndex}`);
    if (!wordElement) return;

    const hurufAktifIndex = teks.length;
    const containerRect = container.getBoundingClientRect();
    let letterElement = wordElement.querySelector(`[data-letterindex="${hurufAktifIndex}"]`);

    if (letterElement) {
      // caret berjalan pada huruf di kata terget yang masih aktif
      const letterRect = letterElement.getBoundingClientRect();
      setCaretPosition({
        top: letterRect.top - containerRect.top,
        left: letterRect.left - containerRect.left
      });
    } else {
      // caret menetap di tempat atau di huruf terakhir
      const allLetters = wordElement.querySelectorAll('[data-letterindex]');
      const lastLetter = allLetters[allLetters.length - 1];
      const letterRect = lastLetter.getBoundingClientRect();

      setCaretPosition({
        top: letterRect.top - containerRect.top,
        left: letterRect.left - containerRect.left + letterRect.width
      });
    }
  }

  function handleShowingNewLine() {
    if (!containerRef.current) return;

    const elementAktif = containerRef.current.querySelector(`[data-wordindex="${kataAktifIndex}"`);
    if (!elementAktif) return;

    const posisiKataAktif = elementAktif.offsetTop;

    if (tinggiBaris === null) {
      if (posisiKataAktif > posisiBarisPertama) {
        setTinggiBaris(posisiKataAktif - posisiBarisPertama);
      }

      return;
    }

    const jumlahBarisTerlewati = Math.round((posisiKataAktif - posisiBarisPertama) / tinggiBaris);

    if (jumlahBarisTerlewati >= 2) {
      setPosisiBarisPertama(prev => prev + tinggiBaris);
      setOffsetGeser(prev => prev + tinggiBaris);
    }
  }

  function handleTimer() {
    if (!isFocus || isPaused === true) return;

    timerIntervalIdRef.current = setInterval(() => {
      setTimer((timer) => (timer <= 0 ? 0 : timer - 1));
    }, 1000);
  }

  function handleTimerOver() {
    if (timer <= 0 && isFocus === true) {
      stopTimer();

      setTimeout(() => {
        setTimer(config.DEFAULT_TIMER);
        setIsFocus(false);
        setTeks('');
        setKataAktifIndex(0);
        setTeksHistory([]);
      }, 600);
    }
  }

  function stopTimer() {
    clearInterval(timerIntervalIdRef.current);
  }

  function checkIsLastWord(newText) {
    const isLastWord = kataAktifIndex === (words.length - 1);
    const isSameLength = newText.length === words[kataAktifIndex].length;

    if (isSameLength && isLastWord) {
      stopTimer();
      setIsFinished(true);
      setIsFocus(false);
      setIsPaused(false);
    }
  }

  function handlePause() {
    setIsPaused(prev => !prev);
  }

  return (
    <div className='relative w-5/6 mx-auto h-full flex flex-col gap-y-40' onClick={() => inputBoxRef.current.focus()}>

      <input
        ref={inputBoxRef}
        type='text'
        value={teks}
        onChange={(event) => {
          if (isFinished === false && isPaused === false) {
            const newText = event.target.value;
            setTeks(newText);
            setIsFocus(true);

            checkIsLastWord(newText);
          }
        }}
        onKeyDown={handleSpace}
        className='absolute opacity-0 pointer-evens-none'
      />

      <div className='flex items-center justify-between'>
        <div className='w-full flex items-center dm-sans text-shade-white gap-2'>
          <Keyboard size={34} className='text-(--main-color)' />
          <h1 className='text-3xl font-medium'>keyboardtype</h1>
        </div>
        <span id='language' className={`${isFocus ? 'invisible' : 'visible'} transition-opacity duration-500 w-fit mx-auto flex items-center dm-sans gap-2 text-(--text-color) text-sm cursor-pointer py-1 px-2 rounded-md hover:bg-white/10`}>
          <Earth size={16} />
          English
        </span>
      </div>

      <div className='grow'>
        <div className='w-full'>
          <div className='w-full relative'>
            <p id='timer' className={`${isFocus ? 'visible' : 'invisible'} transition-opacity relative bottom-6 duration-500 text-4xl dm-sans text-(--main-color)`}>{Util.formatTimer(timer)}</p>
          </div>

          {isFinished ? (
            <div className='select-none flex items-center justify-center h-38 mb-8'>
              <p className='text-[2.5rem] crimson-pro'>Finish</p>
            </div>
          ) : (
            <div className='relative mb-8 h-38 overflow-hidden'>
              <div
                ref={containerRef}
                className='transition-transform duration-300 relative select-none text-[2.5rem] leading-none crimson-pro flex flex-wrap gap-x-3 gap-y-3'
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
