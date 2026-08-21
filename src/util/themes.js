export const themes = [
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

export const THEME_MAP = Object.fromEntries(themes.map((theme) => [theme.id, theme.name]));
