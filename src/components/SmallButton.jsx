export default function SmallButton({ children, onClick, extraClass = '' }) {
    const defaultClassname = 'transition-opacity duration-500 pointer-events-auto w-fit block text-(--text-color) cursor-pointer p-1 rounded-md hover:bg-white/10 ' + extraClass;

    return (
        <button
            onClick={onClick}
            className={defaultClassname}>
            {children}
        </button>
    );
}