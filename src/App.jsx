import { useState } from 'react'
import { Earth, AlarmClock, RotateCcw, Keyboard } from 'lucide-react';
import Word from './components/Word.jsx';

const wordList = [
  "halo", "polisi", "laravel", "samsung", "tertawa",
  "dunia", "rumah", "makanan", "coklat", "menari",
  "programming", "coding", "kardus", "ungu", "jalan",
];

function getRandomWords(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    result.push(wordList[randomIndex]);
  }

  return result;
}

function App() {
  const words = getRandomWords(50);

  return (
    <div className='w-5/6 mx-auto h-full flex flex-col gap-y-40'>
      <div className='flex items-center dm-sans text-shade-white gap-2'>
        <Keyboard size={34} />
        <h1 className='text-3xl font-medium'>keyboardtype</h1>
      </div>

      <div className='grow text-shade-white'>
        <div className='w-full'>

          <div className='w-full relative mb-3'>
            <p className='absolute top-0 left-0 opacity-0 text-3xl font-medium dm-sans'>30</p>
            <span className='w-fit mx-auto flex items-center dm-sans gap-2 text-shade-white text-sm cursor-pointer py-1 px-2 rounded-md hover:bg-white/10'>
              <Earth size={18} />
              Indonesia
            </span>
          </div>

          <div className='mb-3 select-none text-[2.5rem] leading-none crimson-pro flex flex-wrap gap-x-3 gap-y-3 h-[9.5rem] overflow-hidden'>
            {
              words.map((word, index) => (
                <Word key={index} text={word} wordIndex={index} />
              ))
            }
          </div>

          <button className='w-fit block cursor-pointer mx-auto p-1 rounded-md hover:bg-white/10'>
             <RotateCcw size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
