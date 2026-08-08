import { useState, useRef, useEffect } from 'react'
import { Earth, AlarmClock, RotateCcw, Keyboard } from 'lucide-react';
import { wordList } from './util/words.js';
import { classToggle } from './util/util.js';
import * as config from './util/config.js';
import Word from './components/Word.jsx';

function getRandomWords(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    result.push(wordList[randomIndex]);
  }

  return result;
}

export default function App() {
  const [words] = useState(() => getRandomWords(50));
  const [teks, setTeks] = useState('');
  const [kataAktifIndex, setKataAktifIndex] = useState(0);
  const [teksHistory, setTeksHistory] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [timer, setTimer] = useState(config.DEFAULT_TIMER);

  const inputBoxRef = useRef(null);
  const timerIntervalIdRef = useRef(null);

  useEffect(() => inputBoxRef.current.focus(), []);

  useEffect(() => {
    if (!isFocus) return;

    timerIntervalIdRef.current = setInterval(() => {
      setTimer((timer) => (timer <= 0 ? 0 : timer - 1));
    }, 1000);

    return () => clearInterval(timerIntervalIdRef.current)
  }, [isFocus]);

  useEffect(() => {
    if (timer <= 0 && isFocus === true) {
      clearInterval(timerIntervalIdRef.current);

      setTimeout(() => {
        setTimer(config.DEFAULT_TIMER);
        setIsFocus(false);
        setTeks('');
        setKataAktifIndex(0);
        setTeksHistory([]);
      }, 600);
    }
  }, [timer]);

  function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();

      if (teks.length !== 0) {
        setTeksHistory((previousTextHistory) => [...previousTextHistory, teks.toLowerCase()]);
        setKataAktifIndex((previousWordIndex) => previousWordIndex + 1);
        setTeks('');
      }
    }
  }

  function handleRestart() {
    clearInterval(timerIntervalIdRef.current);

    timerIntervalIdRef.current = '';
    setTeks('');
    setKataAktifIndex(0);
    setTeksHistory([]);
    setIsFocus(false);
    setTimer(config.DEFAULT_TIMER);
  }

  return (
    <div className='relative w-5/6 mx-auto h-full flex flex-col gap-y-40' onClick={() => inputBoxRef.current.focus()}>

      <input
        ref={inputBoxRef}
        type='text'
        value={teks}
        onChange={(event) => {
          setTeks(event.target.value);
          setIsFocus(true);
        }}
        onKeyDown={handleKeyDown}
        className='absolute opacity-0 pointer-evens-none'
      />

      <div className='flex items-center dm-sans text-shade-white gap-2'>
        <Keyboard size={34} />
        <h1 className='text-3xl font-medium'>keyboardtype</h1>
      </div>

      <div className='grow text-shade-white'>
        <div className='w-full'>

          <div className='w-full relative mb-6'>
            <p id='timer' className={`${isFocus ? 'visible' : 'invisible'} transition-opacity duration-500 absolute top-0 left-0 text-4xl font-medium dm-sans`}>{timer}</p>
            <span id='language' className={`${isFocus ? 'invisible' : 'visible'} transition-opacity duration-500 w-fit mx-auto flex items-center dm-sans gap-2 text-shade-white text-sm cursor-pointer py-1 px-2 rounded-md hover:bg-white/10`}>
              <Earth size={18} />
              Indonesian
            </span>
          </div>

          <div className='mb-8 select-none text-[2.5rem] leading-none crimson-pro flex flex-wrap gap-x-3 gap-y-3 h-38 overflow-hidden'>
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

          <button onClick={handleRestart} id='restart-btn' className='transition-opacity duration-500 pointer-events-auto w-fit block cursor-pointer mx-auto p-1 rounded-md hover:bg-white/10'>
            <RotateCcw size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
