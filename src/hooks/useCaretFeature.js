import { useEffect, useState, useRef } from "react";

export default function useCaretFeature({ teks, kataAktifIndex }) {
    const [caretPosition, setCaretPosition] = useState(() => { return { top: 0, left: 0 } });
    const containerRef = useRef(null);

    useEffect(() => calculateCaretPosition(), [teks, kataAktifIndex]);

    function calculateCaretPosition() {
        const container = containerRef.current;
        if (!container) return;

        const wordElement = container.querySelector(`[data-wordindex="${kataAktifIndex}`);
        if (!wordElement) return;

        const hurufAktifIndex = teks.length;
        const containerRect = container.getBoundingClientRect();
        let letterElement = wordElement.querySelector(`[data-letterindex="${hurufAktifIndex}"]`);

        if (letterElement) {
            // caret berjalan pada huruf di kata terget yang masih aktif
            const letterRect = letterElement.getBoundingClientRect();
            setCaretPosition({
                top: letterRect.top - containerRect.top,
                left: letterRect.left - containerRect.left
            });
        } else {
            // caret menetap di tempat atau di huruf terakhir
            const allLetters = wordElement.querySelectorAll('[data-letterindex]');
            const lastLetter = allLetters[allLetters.length - 1];
            const letterRect = lastLetter.getBoundingClientRect();

            setCaretPosition({
                top: letterRect.top - containerRect.top,
                left: letterRect.left - containerRect.left + letterRect.width
            });
        }
    }

    function restartCaretState() {
        setCaretPosition({ top: 0, left: 0 });
    }

    return { caretPosition, setCaretPosition, containerRef, restartCaretState };
}