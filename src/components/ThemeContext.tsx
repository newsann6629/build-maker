"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'chaotic' | 'orderly';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('chaotic'); // Default to Chaotic (Dark)

    useEffect(() => {
        // Check localStorage or system preference on mount
        const savedTheme = localStorage.getItem('arcane-theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        // Update data attribute on body
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('arcane-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'chaotic' ? 'orderly' : 'chaotic');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
