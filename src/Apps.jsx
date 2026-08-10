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
    
    // state variable lainnya yang panjang...

    useEffect(() => inputBoxRef.current.focus(), []);
    
    // useEffect() lainnya yang panjang...

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

    // function-function lainnya yang panjang...

    return (
        <div className='relative w-5/6 mx-auto h-full flex flex-col gap-y-40' onClick={() => inputBoxRef.current.focus()}>
            {/* isi jsx yang cukup panjang */}
        </div>
    );
}
