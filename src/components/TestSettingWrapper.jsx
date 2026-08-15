import { Clock, CaseSensitive } from 'lucide-react';
import { generate, count } from "random-words";

import TestSettingContainer from './TestSettingContainer.jsx';
import TypingModeButton from './TypingModeButton.jsx';

export default function TestSettingWrapper({ data }) {
    function setTimeMode() {
        if (data.isFocus || data.isFinished) return;

        data.setTypingMode(data.typingModeList.time);
        data.setTestDuration(data.testDurationList[2]);
        data.setTestWordAmount(data.wordsAmountList[3]);
        data.setTimer(data.testDurationList[2]);
        data.setWords(generate(data.wordsAmountList[2]));
    }

    function setWordMode() {
        if (data.isFocus || data.isFinished) return;

        data.setTypingMode(data.typingModeList.words);
        data.setTestWordAmount(data.wordsAmountList[2]);
        data.setWords(generate(data.wordsAmountList[2]));
    }

    function handleSetTestDuration(time) {
        if (data.isFocus || data.isFinished) return;

        data.setTestDuration(time);
        data.setTimer(time);
    }

    function handleSetWordAmount(amount) {
        if (data.isFocus || data.isFinished) return;

        data.setTestWordAmount(amount);
        data.setWords(generate(amount));
    }

    return (
        <div id='tool-menu' className={`${data.isFocus || data.isFinished ? 'invisible' : 'visible'} flex items-center justify-center gap-3 text-(--sub-color) text-xs`}>
            <TestSettingContainer className={`w-fit flex items-center gap-4 bg-(--sub-alt-color) py-2.5 px-4 rounded-md`}>
                <TypingModeButton
                    onClick={setTimeMode}
                    className={`${data.typingMode === data.typingModeList.time ? 'text-(--text-color) pointer-events-none' : 'hover:text-(--text-color) cursor-pointer'} 'transition-colors duration-300 w-fit flex items-center gap-2`}>
                    <Clock size={16} />
                    <span>Time</span>
                </TypingModeButton>
                <TypingModeButton
                    onClick={setWordMode}
                    className={`${data.typingMode === data.typingModeList.words ? 'text-(--text-color) pointer-events-none' : 'hover:text-(--text-color) cursor-pointer'} 'transition-colors duration-300 w-fit flex items-center gap-2`}>
                    <CaseSensitive size={16} />
                    <span>Words</span>
                </TypingModeButton>
            </TestSettingContainer>
            {
                data.typingMode === data.typingModeList.time ? (
                    <TestSettingContainer className={`transition-opacity duration-200 w-fit flex items-center gap-4 bg-(--sub-alt-color) py-2.5 px-4 rounded-md`}>
                        {
                            data.testDurationList.map((time, index) => {
                                return <TypingModeButton
                                    key={index}
                                    onClick={() => handleSetTestDuration(time)}
                                    className={`${data.testDuration === time ? 'text-(--text-color) pointer-events-none' : 'cursor-pointer hover:text-(--text-color)'} transition-colors duration-300`}
                                >{time}</TypingModeButton>
                            })
                        }
                    </TestSettingContainer>
                ) : (
                    <TestSettingContainer className={`transition-opacity duration-200 w-fit flex items-center gap-4 bg-(--sub-alt-color) py-2.5 px-4 rounded-md`}>
                        {
                            data.wordsAmountList.map((amount, index) => {
                                return <TypingModeButton
                                    key={index}
                                    onClick={() => handleSetWordAmount(amount)}
                                    className={`${data.testWordAmount === amount ? 'text-(--text-color) pointer-events-none' : 'cursor-pointer hover:text-(--text-color)'} transition-colors duration-300`}
                                >{amount}</TypingModeButton>
                            })
                        }
                    </TestSettingContainer>
                )
            }
        </div>
    );
}