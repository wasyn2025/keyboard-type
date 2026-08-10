export default function Caret({isFocus, caretPosition}) {
    return (
        <div
            className={`absolute w-0.75 h-11 bg-(--caret-color) transition-[top,left] duration-100 ease-linear ${isFocus ? '' : 'caret-blink'}`}
            style={{
                top: `${caretPosition.top}px`,
                left: `${caretPosition.left}px`
            }}
        />
    );
}