export default function Caret({isFocus, caretPosition}) {
    return (
        <div
            className={`absolute w-0.75 h-10 bg-(--caret-color) transition-[top,left] duration-150 ${isFocus ? '' : 'caret-blink'}`}
            style={{
                top: `${caretPosition.top}px`,
                left: `${caretPosition.left}px`
            }}
        />
    );
}