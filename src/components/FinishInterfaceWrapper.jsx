import CounterBlock from './CounterBlock.jsx';
import CounterBlockGrid from './CounterBlockGrid.jsx';
import TestMetaData from './TestMetaData.jsx';
import TestMetaDataContainer from './TestMetaDataContainer.jsx';

export default function FinishInterfaceWrapper({ data }) {
    if(data.typingMode === data.typingModeWord) {
        data.time = 0;
        data.timeSuffix = 's';
        data.elapsedTime = '00:00:00';
    }

    return (
        <div id='finish-container' className='select-none mb-8 font-general-sans'>
            <div className='mx-auto w-fit'>
                <CounterBlockGrid>
                    <CounterBlock type={'WPM'} data={data.wpm} />
                    <CounterBlock type={'Accuracy'} data={data.acc} suffix={data.accSuffix} />
                    <CounterBlock type={'Consistency'} data={data.consistency} suffix={data.consistencySuffix} />
                    <CounterBlock type={'Time'} data={data.time} suffix={data.timeSuffix} />
                </CounterBlockGrid>
                <TestMetaDataContainer>
                    <TestMetaData text={data.testWordAmount} />
                    <TestMetaData text={data.elapsedTime} />
                </TestMetaDataContainer>
            </div>
        </div>
    );
}