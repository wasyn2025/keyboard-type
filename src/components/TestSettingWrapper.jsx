import { Clock, CaseSensitive } from 'lucide-react';

import TestSettingContainer from './TestSettingContainer.jsx';
import TypingModeButton from './TypingModeButton.jsx';

export default function TestSettingWrapper({ data }) {
    function handleSetTimeMode() {
        if (data.isFocus || data.isFinished) return;
        data.setTimeMode();
    }

    function handleSetWordMode() {
        if (data.isFocus || data.isFinished) return;
        data.setWordMode();
    }

    function handleSetTestDuration(time) {
        if (data.isFocus || data.isFinished) return;
        data.setTestDuration(time);
        data.setTimer(time)
    }

    function handleSetWordAmount(word) {
        if (data.isFocus || data.isFinished) return;
    }

    return (
        <div id='tool-menu' className={`${data.isFocus || data.isFinished ? 'invisible' : 'visible'} flex items-center justify-center gap-3 text-(--sub-color) text-xs`}>
            <TestSettingContainer className={`w-fit flex items-center gap-4 bg-(--sub-alt-color) py-2.5 px-4 rounded-md`}>
                <TypingModeButton
                    onClick={handleSetTimeMode}
                    className={`${data.typingMode === data.typingModeList.time ? 'text-(--text-color) pointer-events-none' : 'hover:text-(--text-color) cursor-pointer'} 'transition-colors duration-300 w-fit flex items-center gap-2`}>
                    <Clock size={16} />
                    <span>Time</span>
                </TypingModeButton>
                <TypingModeButton
                    onClick={handleSetWordMode}
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
                                    onClick={() => { console.log('Hello World') }}
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