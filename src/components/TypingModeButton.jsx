export default function TypingModeButton({ children, onClick, extraClass }) {
    const className = 'transition-colors duration-300 w-fit flex items-center gap-2 ' + extraClass;

    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}