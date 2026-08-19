export default function Timer({ timer, extraClass = '' }) {
    const className = 'transition-opacity relative bottom-4 duration-500 text-4xl font-general-sans text-(--main-color) ' + extraClass;

    return <p id='timer' className={className}>{timer}</p>;
}