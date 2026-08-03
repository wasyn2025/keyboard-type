import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import './App.css'

import { Earth } from 'lucide-react';

function App() {
  return (
    <div className='w-5/6 mx-auto'>
      <div className='flex justify-between items-center dm-sans'>
        <h1 className='text-4xl text-shade-white font-medium'>keyboardtype</h1>
        <span className='flex items-center gap-2 text-shade-white text-sm cursor-pointer py-1 px-2 rounded-md hover:bg-white/10'>
          <Earth size={18} />
          Indonesia
        </span>
      </div>
    </div>
  );
}

export default App
