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

export function formatTimer(totalSeconds, isCleanFormat = true) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (num) => String(num).padStart(2, '0');
    let result = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    if (isCleanFormat === true) {
        if (hours !== 0) {
            result = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        } else if (minutes !== 0) {
            result = `${pad(minutes)}:${pad(seconds)}`
        } else {
            result = `${seconds}`
        }
    }

    return result;
}

export function limitTyping(typedWords, kataAktifIndex, containerRef) {
    const currentWord = containerRef.current.querySelector(`[data-wordindex="${kataAktifIndex}"`);
    const currentWordLength = currentWord.querySelectorAll('span').length;

    return typedWords.length > currentWordLength ? true : false;
}

export function convertElapsedTime(elapsedTime) {
    if (elapsedTime >= 3600) {
        return Math.floor(elapsedTime / 3600);
    }

    if (elapsedTime >= 60) {
        return Math.floor(elapsedTime / 60);
    }

    return elapsedTime;
}

export function handleElapsedTimeSuffix(elapsedTime) {
    let suffix = '';

    if(elapsedTime >= 3600) {
        return 'h';
    }

    if(elapsedTime >= 60) {
        return 'm';
    }

    return 's';
}