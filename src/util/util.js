import { wordList } from './words.js';

export function classToggle(classname, remove, add) {
    document.querySelector(classname).classList.remove(remove);
    document.querySelector(classname).classList.add(add);
}

export function getRandomWords(count) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        result.push(wordList[randomIndex]);
    }

    return result;
}

export function formatTimer(totalSeconds) {
    // Hitung jam, menit, dan sisa detik
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format agar selalu 2 digit (misal: 3 menjadi "03")
    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}