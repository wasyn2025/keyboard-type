import { useState } from 'react'
import { Earth, AlarmClock } from 'lucide-react';
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
      <div className='flex justify-between items-center dm-san'>
        <h1 className='text-3xl text-shade-white font-medium'>keyboardtype</h1>
        <span className='flex items-center gap-2 text-shade-white text-sm cursor-pointer py-1 px-2 rounded-md hover:bg-white/10'>
          <Earth size={18} />
          Indonesia
        </span>
      </div>

      <div className='grow text-shade-white'>
        <div className='w-full'>
          <p className='text-3xl font-medium mb-5 opacity-0'>30</p>
          <div className='select-none text-[2.5rem] leading-none crimson-pro flex flex-wrap gap-x-3 gap-y-2 h-[9rem] overflow-hidden'>
            {
              words.map((word, index) => (
                <Word key={index} text={word} wordIndex={index} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
