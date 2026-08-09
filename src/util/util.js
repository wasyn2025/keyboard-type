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