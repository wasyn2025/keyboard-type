import { useRef, useEffect, useMemo } from 'react';

export default function useVirtualWords({
    words,
    kataAktifIndex,
    offsetGeser,
    tinggiBaris,
    containerRef,
    bufferFutureWords = 30
}) {
    const lineStartIndicesRef = useRef([0]);

    useEffect(() => {
        if (!containerRef?.current || tinggiBaris === null || tinggiBaris <= 0) return;

        const elementAktif = containerRef.current.querySelector(`[data-wordindex="${kataAktifIndex}"]`);
        if (!elementAktif) return;

        const currentLine = Math.round(elementAktif.offsetTop / tinggiBaris);

        if (lineStartIndicesRef.current[currentLine] === undefined) {
            lineStartIndicesRef.current[currentLine] = kataAktifIndex;
            console.log(lineStartIndicesRef.current);
        }
    }, [kataAktifIndex, tinggiBaris, containerRef]);

    const { startIndex, topSpacerHeight } = useMemo(() => {
        if (!tinggiBaris || tinggiBaris <= 0 || offsetGeser <= 0) {
            return { startIndex: 0, topSpacerHeight: 0 };
        }

        const linesPassed = Math.floor(offsetGeser / tinggiBaris);
        const linesToCull = Math.max(0, linesPassed - 1);

        if (linesToCull <= 0) {
            return { startIndex: 0, topSpacerHeight: 0 };
        }

        const cullStartIndex = lineStartIndicesRef.current[linesToCull] ?? 0;
        const spacerHeight = linesToCull * tinggiBaris;

        return {
            startIndex: cullStartIndex,
            topSpacerHeight: spacerHeight
        };
    }, [offsetGeser, tinggiBaris]);

    const visibleWords = useMemo(() => {
        const endIndex = Math.min(words.length, kataAktifIndex + bufferFutureWords);
        const sliceStart = Math.min(startIndex, kataAktifIndex);

        const result = [];
        for (let i = sliceStart; i < endIndex; i++) {
            result.push({
                kata: words[i],
                kataIndex: i
            });
        }
        return result;
    }, [words, startIndex, kataAktifIndex, bufferFutureWords]);

    function restartVirtualWords() {
        lineStartIndicesRef.current = [0];
    }

    return {
        visibleWords,
        topSpacerHeight,
        restartVirtualWords
    };
}
