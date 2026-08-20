import { useEffect, useState, useRef } from "react";
import { generate } from "random-words";

export default function useNewLineFeature({ isFocus, isInfiniteWord, kataAktifIndex, containerRef, setWords }) {
    const [offsetGeser, setOffsetGeser] = useState(() => 0);
    const [posisiBarisPertama, setPosisiBarisPertama] = useState(() => 0);
    const [tinggiBaris, setTinggiBaris] = useState(() => null);

    useEffect(() => handleShowingNewLine(), [kataAktifIndex]);

    function handleShowingNewLine() {
        if (!isFocus) return;

        const elementAktif = containerRef.current.querySelector(`[data-wordindex="${kataAktifIndex}"]`);
        const posisiKataAktif = elementAktif.offsetTop;

        if (tinggiBaris === null) {
            if (posisiKataAktif > posisiBarisPertama) {
                setTinggiBaris(posisiKataAktif - posisiBarisPertama);
            }

            return;
        }

        const jumlahBarisTerlewati = Math.round((posisiKataAktif - posisiBarisPertama) / tinggiBaris);

        if (jumlahBarisTerlewati >= 2) {
            setPosisiBarisPertama(prev => prev + tinggiBaris);
            setOffsetGeser(prev => prev + tinggiBaris);
            if (isInfiniteWord === true) setWords((previousWords) => [...previousWords, ...generate(10)]);
        }
    }

    function restartNewLineState() {
        setOffsetGeser(0);
        setPosisiBarisPertama(0);
        setTinggiBaris(null);
    }

    return { offsetGeser, tinggiBaris, restartNewLineState };
}