import { Clock, CaseSensitive } from 'lucide-react';
import { generate } from "random-words";
import { DEFAULT_GENERATED_WORD } from '../util/config.js';

function TestSettingContainer({ className, children }) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

function TypingModeButton({ children, onClick, className }) {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}

export default function TestSettingWrapper({ data, state, setter }) {
    function updateTypingSettings({ testDuration, typingMode, wordAmount, isInfiniteWord }) {
        setter.setTimer(testDuration);
        setter.setTypingMode(typingMode);
        setter.setPreferences((prevPreferences) => ({ ...prevPreferences, typingMode: typingMode }));
        setter.setWords(generate(wordAmount));
        setter.setIsInfiniteWord(isInfiniteWord);
    }

    function setTimeMode() {
        if (state.isFocus || state.isFinished) return;

        updateTypingSettings({
            testDuration: state.testDuration,
            typingMode: data.typingModeList.time,
            wordAmount: DEFAULT_GENERATED_WORD,
            isInfiniteWord: true,
        });
    }

    function setWordMode() {
        if (state.isFocus || state.isFinished) return;

        updateTypingSettings({
            testDuration: 0,
            typingMode: data.typingModeList.words,
            wordAmount: state.testWordAmount,
            isInfiniteWord: false,
        });
    }

    function handleSetTestDuration(time) {
        if (state.isFocus || state.isFinished) return;

        setter.setTestDuration(time);
        setter.setTimer(time);
        setter.setPreferences((prevPreferences) => ({ ...prevPreferences, testDuration: time }));
    }

    function handleSetWordAmount(amount) {
        if (state.isFocus || state.isFinished) return;

        setter.setTestWordAmount(amount);
        setter.setWords(generate(amount));
        setter.setPreferences((prevPreferences) => ({ ...prevPreferences, wordAmount: amount }));
    }

    return (
        <div id='tool-menu' className={`${state.isFocus || state.isFinished ? 'invisible' : 'visible'} flex items-center justify-center gap-3 text-(--sub-color) text-xs`}>
            <TestSettingContainer className={`w-fit flex items-center gap-4 bg-(--sub-alt-color) py-2.5 px-4 rounded-md`}>
                <TypingModeButton
                    onClick={setTimeMode}
                    className={`${state.typingMode === data.typingModeList.time ? 'text-(--text-color) pointer-events-none' : 'hover:text-(--text-color) cursor-pointer'} 'transition-colors duration-300 w-fit flex items-center gap-2`}>
                    <Clock size={16} />
                    <span>Time</span>
                </TypingModeButton>
                <TypingModeButton
                    onClick={setWordMode}
                    className={`${state.typingMode === data.typingModeList.words ? 'text-(--text-color) pointer-events-none' : 'hover:text-(--text-color) cursor-pointer'} 'transition-colors duration-300 w-fit flex items-center gap-2`}>
                    <CaseSensitive size={16} />
                    <span>Words</span>
                </TypingModeButton>
            </TestSettingContainer>
            {
                state.typingMode === data.typingModeList.time ? (
                    <TestSettingContainer className={`transition-opacity duration-200 w-fit flex items-center gap-4 bg-(--sub-alt-color) py-2.5 px-4 rounded-md`}>
                        {
                            data.testDurationList.map((time, index) => {
                                return <TypingModeButton
                                    key={index}
                                    onClick={() => handleSetTestDuration(time)}
                                    className={`${state.testDuration === time ? 'text-(--text-color) pointer-events-none' : 'cursor-pointer hover:text-(--text-color)'} transition-colors duration-300`}
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
                                    className={`${state.testWordAmount === amount ? 'text-(--text-color) pointer-events-none' : 'cursor-pointer hover:text-(--text-color)'} transition-colors duration-300`}
                                >{amount}</TypingModeButton>
                            })
                        }
                    </TestSettingContainer>
                )
            }
        </div>
    );
}