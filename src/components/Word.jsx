function Word({kata, dataWordIndex, teksUntukDibandingkan}) {
    return <div data-wordindex={dataWordIndex}>
        {kata.split('').map((huruf, hurufIndex) => {
            let warna = "text-white/20";

            if(hurufIndex < teksUntukDibandingkan.length) {
                warna = teksUntukDibandingkan[hurufIndex] === huruf ?
                    'text-white/80' :
                    'text-[#D95F5F]';
            }

            return <span key={hurufIndex} className={warna}>{huruf}</span>;
        })}
    </div>;
}

export default Word;