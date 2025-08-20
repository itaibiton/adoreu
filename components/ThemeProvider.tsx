import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    colorScheme: ColorSchemeName;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('system');
    const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
        Appearance.getColorScheme()
    );

    // Listen to system appearance changes
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setSystemColorScheme(colorScheme);
        });

        return () => subscription?.remove();
    }, []);

    // Determine the actual color scheme to use
    const colorScheme: ColorSchemeName =
        theme === 'system' ? systemColorScheme : theme === 'dark' ? 'dark' : 'light';

    const isDark = colorScheme === 'dark';

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    const value: ThemeContextType = {
        theme,
        colorScheme,
        setTheme,
        toggleTheme,
        isDark,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
