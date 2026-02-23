import React, { useState } from 'react';
import { parseTaskFromString } from '../services/openrouterService.js';
import { SparklesIcon, LoadingIcon } from './Icons.jsx';

const AiTaskCreator = ({ onTaskCreate }) => {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const taskData = await parseTaskFromString(inputValue);
            onTaskCreate(taskData);
            setInputValue('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-lg border border-slate-200 dark:border-dark-border">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-grow w-full relative">
                    <SparklesIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-secondary" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLoading}
                        placeholder="e.g., 'Draft Q3 report for Alice due next Friday, high priority'"
                        className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition duration-200"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:cursor-not-allowed transition duration-200"
                >
                    {isLoading ? (
                        <>
                            <LoadingIcon className="animate-spin h-5 w-5" />
                            Creating...
                        </>
                    ) : (
                        'Create Task with AI'
                    )}
                </button>
            </form>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default AiTaskCreator;
