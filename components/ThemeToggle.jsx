import React from 'react';
import { SunIcon, MoonIcon } from './Icons.jsx';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-card focus:ring-brand-primary transition-colors duration-200"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
                <MoonIcon className="w-6 h-6 text-slate-600" />
            )}
        </button>
    );
};

export default ThemeToggle;
