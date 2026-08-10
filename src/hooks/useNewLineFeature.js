import { useEffect, useState, useRef } from "react";

export function useNewLineFeature(kataAktifIndex, containerRef) {
    const [offsetGeser, setOffsetGeser] = useState(0);
    const [posisiBarisPertama, setPosisiBarisPertama] = useState(0);
    const [tinggiBaris, setTinggiBaris] = useState(null);

    useEffect(() => handleShowingNewLine(), [kataAktifIndex]);

    function handleShowingNewLine() {
        if (!containerRef.current) return;

        const elementAktif = containerRef.current.querySelector(`[data-wordindex="${kataAktifIndex}"`);
        if (!elementAktif) return;

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
        }
    }

    return { offsetGeser, setOffsetGeser, setPosisiBarisPertama, setTinggiBaris };
}