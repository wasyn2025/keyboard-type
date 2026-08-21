import { Check } from 'lucide-react';
import { themes } from '../util/themes';

export default function ThemeModal({ activeTheme, onSelectTheme, onClose }) {
    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div onClick={(e) => e.stopPropagation()} className="bg-(--sub-alt-color) rounded-lg p-4 w-116 h-125 flex flex-col overflow-scroll text-(--text-color)">
                {themes.map((theme) => (
                    <div
                        key={theme.id}
                        onClick={() => onSelectTheme(theme.id)}
                        className={`${activeTheme === theme.id ? 'pointer-events-none' : 'cursor-pointer hover:bg-white/10'} font-general-sans rounded-md flex items-center justify-between gap-3 px-3 py-2`}
                    >
                        {activeTheme === theme.id ? (<Check size={16} />) : null}
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
    );
}
