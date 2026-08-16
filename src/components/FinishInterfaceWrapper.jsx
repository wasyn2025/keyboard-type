import { useState, useEffect } from 'react'
import useWpmCalculation from '../hooks/useWpmCalculation.js';

function CounterBlockGrid({ children }) {
    return (
        <div className='grid grid-cols-[repeat(4,150px)] mb-3'>
            {children}
        </div>
    )
}

function CounterBlock({ type, data, suffix = '' }) {
    return (
        <div className='aspect-square gap-2 flex flex-col items-center justify-center text-(--text-color) border border-(--sub-color)'>
            <span className='font-medium text-5xl'>{data ?? 0}{suffix !== '' ? <span className='text-2xl'>{suffix}</span> : ''}</span>
            <span className='text-sm'>{type}</span>
        </div>
    );
}

function TestMetaData({ text }) {
    return (
        <p className='text-(--sub-color) text-base'>{text}</p>
    );
}

function TestMetaDataContainer({ children }) {
    return (
        <div className='flex items-center justify-between'>
            {children}
        </div>
    );
}

export default function FinishInterfaceWrapper({ data, state, setter }) {
    const {
        wpm,
        setWpm,
        calculateCorrectChars,
        calculateWpm,
        restartWpmState
    } = useWpmCalculation(state.teksHistory, state.words);

    useEffect(() => {
        if (state.isFinished === true) {
            const elapsedSeconds = state.typingMode === state.typingModeList.time ? 
                state.testDuration - state.timer : 
                state.timer;

            const correctChars = calculateCorrectChars(state.teksHistory, state.words);
            const wpmResult = calculateWpm(correctChars, elapsedSeconds);
            const accResult = setter.calculateAcc(state.correctKeyStrokes, state.totalKeyStrokes);

            setWpm((previousWpm) => wpmResult);
            setter.setAcc(accResult);
        }
    }, [state.isFinished]);

    if (state.typingMode === state.typingModeList.words) {
        state.time = 0;
        state.timeSuffix = 's';
        state.elapsedTime = '00:00:00';
    }

    return (
        <div id='finish-container' className='select-none mb-8 font-general-sans'>
            <div className='mx-auto w-fit'>
                <CounterBlockGrid>
                    <CounterBlock type={'WPM'} data={wpm} />
                    <CounterBlock type={'Accuracy'} data={state.acc} suffix='%' />
                    <CounterBlock type={'Consistency'} data={state.consistency} suffix='%' />
                    <CounterBlock type={'Time'} data={state.time} suffix={state.timeSuffix} />
                </CounterBlockGrid>
                <TestMetaDataContainer>
                    <TestMetaData text={state.testWordAmount} />
                    <TestMetaData text={state.elapsedTime} />
                </TestMetaDataContainer>
            </div>
        </div>
    );
}