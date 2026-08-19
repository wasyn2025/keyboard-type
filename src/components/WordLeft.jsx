export default function WordLeft({ data }) {
    const className = 'transition-opacity relative bottom-4 duration-500 text-4xl font-general-sans text-(--main-color) ' + data.extraClass;

    return <p id='amount' className={className}>{data.currentWord}/{data.testWordAmount}</p>;
}