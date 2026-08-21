import { useState, useEffect, memo, lazy, Suspense } from 'react';
import { Palette } from 'lucide-react';
import { THEME_MAP } from '../util/themes';

const ThemeModal = lazy(() => import('./ThemeModal'));

function ThemeSwitcher({ isFocus, setPreferences, defaultPreferences }) {
    const [activeTheme, setActiveTheme] = useState(() => {
        const saved = localStorage.getItem('preferences');
        const theme = saved ? JSON.parse(saved).theme : null;
        return theme !== null ? theme : defaultPreferences.theme;
    });
    const [isOpen, setIsOpen] = useState(false);

    const activeThemeName = THEME_MAP[activeTheme] || activeTheme;
    useEffect(() => document.body.setAttribute('data-theme', activeTheme), [activeTheme]);

    function handleSelectTheme(themeId) {
        setActiveTheme(themeId);
        setPreferences((prevPreferences) => ({ ...prevPreferences, theme: themeId }));
    }

    return (
        <>
            <span
                onClick={() => setIsOpen(true)}
                className={`${isFocus ? 'invisible' : 'visible'} whitespace-nowrap transition-opacity duration-500 w-fit mx-auto flex items-center gap-2 text-(--text-color) text-xs cursor-pointer py-1 px-2 rounded-md hover:bg-white/10`}
            >
                <Palette size={16} />
                {activeThemeName}
            </span>

            {isOpen && (
                <Suspense fallback={null}>
                    <ThemeModal
                        activeTheme={activeTheme}
                        onSelectTheme={handleSelectTheme}
                        onClose={() => setIsOpen(false)}
                    />
                </Suspense>
            )}
        </>
    );
}

export default memo(ThemeSwitcher);