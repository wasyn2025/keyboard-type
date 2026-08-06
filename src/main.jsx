import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import KotakKetik from './test/KotakKetik.jsx';
import TeksKetik from './test/TesKetik.jsx';
import TesKetikBanyak from './test/TestKetikBanyak.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
