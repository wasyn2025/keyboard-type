export default function Word({ kata, dataWordIndex, teksUntukDibandingkan, isPassed }) {
    let className = { color: 'netral', underline: '' };
    teksUntukDibandingkan = teksUntukDibandingkan.slice(0, kata.length);

    if (isPassed !== false && kata !== teksUntukDibandingkan) {
        const jumlahDash = kata.length - teksUntukDibandingkan.length;
        className.underline = 'incorrect-underline';

        for (let i = 0; i < jumlahDash; i++) {
            teksUntukDibandingkan += '-';
        }
    }

    return <div data-wordindex={dataWordIndex}>
        {kata.split('').map((huruf, hurufIndex) => {
            className.color = 'neutral';

            if (hurufIndex < teksUntukDibandingkan.length) {
                className.color = teksUntukDibandingkan[hurufIndex].toLowerCase() === huruf ?
                    'correct' :
                    'incorrect';
            }

            return <span
                data-letterindex={hurufIndex}
                key={hurufIndex}
                className={`${className.color} ${className.underline} transition-[color] duration-200`}
            >{huruf}</span>;
        })}
    </div>;
}