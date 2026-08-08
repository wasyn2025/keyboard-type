import { useState, useRef, useEffect } from 'react'
import { Earth, AlarmClock, RotateCcw, Keyboard, SettingsIcon } from 'lucide-react';
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
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });

  const [offsetGeser, setOffsetGeser] = useState(0);
  const [posisiBarisPertama, setPosisiBarisPertama] = useState(0);
  const [tinggiBaris, setTinggiBaris] = useState(null);

  const inputBoxRef = useRef(null);
  const timerIntervalIdRef = useRef(null);
  const containerRef = useRef(null);

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

  useEffect(() => {
    calculateCaretPosition();
  }, [teks, kataAktifIndex]);

  useEffect(() => {
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
  }, [kataAktifIndex]);

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
      // caret berpindah ke kata selanjutnya karena kata target sudah selesai
      const allLetters = wordElement.querySelectorAll('[data-letterindex]');
      const lastLetter = allLetters[allLetters.length - 1];
      const letterRect = lastLetter.getBoundingClientRect();

      setCaretPosition({
        top: letterRect.top - containerRect.top,
        left: letterRect.left - containerRect.left + letterRect.width
      });
    }
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
            <p id='timer' className={`${isFocus ? 'visible' : 'invisible'} transition-opacity duration-500 absolute top-0 left-0 text-4xl font-medium dm-sans text-yellow-500`}>{timer}</p>
            <span id='language' className={`${isFocus ? 'invisible' : 'visible'} transition-opacity duration-500 w-fit mx-auto flex items-center dm-sans gap-2 text-shade-white text-base cursor-pointer py-1 px-2 rounded-md hover:bg-white/10`}>
              <Earth size={18} />
              Indonesian
            </span>
          </div>

          <div className='relative mb-8 h-38 overflow-hidden'>
            <div
              ref={containerRef}
              className='transition-transform duration-300 relative select-none text-[2.5rem] leading-none crimson-pro flex flex-wrap gap-x-3 gap-y-3'
              style={{ transform: `translateY(-${offsetGeser}px)` }}
            >
              <div
                className={`absolute w-0.75 h-10 bg-yellow-400 transition-[top,left] duration-150 ${isFocus ? '' : 'caret-blink'}`}
                style={{
                  top: `${caretPosition.top}px`,
                  left: `${caretPosition.left}px`
                }}
              />
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

          <button onClick={handleRestart} id='restart-btn' className='transition-opacity duration-500 pointer-events-auto w-fit block cursor-pointer mx-auto p-1 rounded-md hover:bg-white/10'>
            <RotateCcw size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
