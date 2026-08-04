function Word({text, wordIndex}) {
    return <div className="text-white/20" data-wordindex={wordIndex}>
        {text.split('').map((char, index) => (
            <span key={index}>{char}</span>
        ))}
    </div>;
}

export default Word;