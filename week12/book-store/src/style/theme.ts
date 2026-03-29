type ColorKey = 'primary' | 'background';
type ThemeName = 'light' | 'dark';

interface Theme {
    name: ThemeName;
    color: Record<ColorKey, string>;
}

export const light: Theme = {
    name: 'light',
    color: {
        primary: 'brown',
        background: 'lightgray',
    },
};

export const dark: Theme = {
    name: 'dark',
    color: {
        primary: 'coral',
        background: 'midnightblue',
    },
};
