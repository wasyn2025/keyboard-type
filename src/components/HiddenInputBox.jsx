export default function HiddenInputBox({ ref, value, onChange, onKeyDown }) {
    return <input
        ref={ref}
        type='text'
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className='absolute opacity-0 pointer-evens-none'
    />;
}