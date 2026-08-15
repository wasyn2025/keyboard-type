import { useState, useRef } from 'react';
import { Palette, Check } from 'lucide-react';

const themes = [
  { id: 'mountain', name: 'Mountain' },
  { id: 'gruvbox-dark', name: 'Gruvbox Dark' },
  { id: 'serika-dark', name: 'Serika Dark' },
  { id: 'dracula', name: 'Dracula' },
  { id: 'laser', name: 'Laser' },
  { id: '8008', name: 'Crimson Dark' },
  { id: 'terminal', name: 'Terminal' },
  { id: 'bento', name: 'Bento' },
  { id: 'miami', name: 'Miami' },
  { id: 'camping', name: 'Camping' },
  { id: 'nord', name: 'Nord' },
  { id: 'ayu-dark', name: 'Ayu Dark' },
  { id: 'tokyo-night', name: 'Tokyo Night' },
  { id: 'solarized-dark', name: 'Solarized Dark' },
  { id: 'catppuccin-mocha', name: 'Catppuccin Mocha' },
  { id: 'rose-pine', name: 'Rose Pine' },
  { id: 'monokai', name: 'Monokai' },
  { id: 'cyberpunk', name: 'Cyberpunk' },
  { id: 'botanical', name: 'Botanical' },
  { id: 'iceberg', name: 'Iceberg' },
];

export default function ThemeSwitcher({ isFocus, activeTheme, setActiveTheme }) {
    const [isOpen, setIsOpen] = useState(false);
    const activeThemeName = themes.find((theme) => theme.id === activeTheme)?.name;

    function handleSelectTheme(themeId) {
        setActiveTheme(themeId);
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
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div onClick={(e) => e.stopPropagation()} className="bg-(--sub-alt-color) rounded-lg p-4 w-116 h-125 flex flex-col overflow-scroll text-(--text-color)">
                        {themes.map((theme) => (
                            <div
                                key={theme.id}
                                onClick={() => handleSelectTheme(theme.id)}
                                className={`${activeTheme === theme.id ? 'pointer-events-none' : 'cursor-pointer hover:bg-white/10'} font-general-sans rounded-md flex items-center justify-between gap-3 px-3 py-2`}
                            >
                                {activeTheme === theme.id ? (<Check size={16} />) : ''}
                                <div data-theme={theme.id} className='flex items-center justify-between gap-3 grow'>
                                    <span className="text-sm">{theme.name}</span>
                                    <div className="flex gap-1">
                                        <div className="size-4 rounded-sm bg-(--bg-color) border border-white/20" />
                                        <div className="size-4 rounded-sm bg-(--main-color)" />
                                        <div className="size-4 rounded-sm bg-(--error-color)" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}