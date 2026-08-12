export default function CounterBlock({ type, data, suffix = '' }) {
    return (
        <div className='aspect-square gap-2 flex flex-col items-center justify-center text-(--text-color) border border-(--sub-color)'>
            <span className='font-medium text-5xl'>{data ?? 0}{suffix !== '' ? <span className='text-2xl'>{suffix}</span> : ''}</span>
            <span className='text-sm'>{type}</span>
        </div>
    );
}