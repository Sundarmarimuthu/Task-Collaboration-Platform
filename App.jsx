import React, { useState, useEffect } from 'react';
import { Status } from './types.js';
import { INITIAL_COLUMNS, INITIAL_TASKS } from './constants.js';
import AiTaskCreator from './components/AiTaskCreator.jsx';
import KanbanBoard from './components/KanbanBoard.jsx';
import EditTaskModal from './components/EditTaskModal.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { LogoIcon } from './components/Icons.jsx';

const App = () => {
    const [tasks, setTasks] = useState(() => {
        try {
            const savedTasks = localStorage.getItem('intellitask-tasks');
            return savedTasks ? JSON.parse(savedTasks) : INITIAL_TASKS;
        } catch (error) {
            console.error('Failed to load tasks from localStorage:', error);
            return INITIAL_TASKS;
        }
    });

    const [columns, setColumns] = useState(INITIAL_COLUMNS);
    const [editingTask, setEditingTask] = useState(null);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('intellitask-theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('intellitask-theme', theme);
    }, [theme]);

    useEffect(() => {
        try {
            localStorage.setItem('intellitask-tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks to localStorage:', error);
        }
    }, [tasks]);

    const handleThemeToggle = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const handleAddTask = (taskData) => {
        setTasks((prevTasks) => {
            const newTask = {
                ...taskData,
                id: `task-${Date.now()}`,
                status: taskData.status || Status.ToDo,
            };
            return [...prevTasks, newTask];
        });
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditingTask(null);
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setEditingTask(null);
    };

    return (
        <div className="min-h-screen font-sans antialiased bg-slate-100 dark:bg-dark-bg">
            <header className="p-4 border-b bg-white dark:bg-dark-card dark:border-dark-border shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LogoIcon className="h-8 w-8 text-brand-primary" />
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            IntelliTask AI
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="hidden md:block text-sm text-slate-500 dark:text-slate-400">
                            AI-Powered Predictive Task Management
                        </p>
                        <ThemeToggle theme={theme} toggleTheme={handleThemeToggle} />
                    </div>
                </div>
            </header>

            <main className="p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <AiTaskCreator onTaskCreate={handleAddTask} />
                    <div className="mt-8">
                        <KanbanBoard
                            columns={columns}
                            tasks={tasks}
                            onEditTask={setEditingTask}
                        />
                    </div>
                </div>
            </main>

            <footer className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>Built by a world-class senior frontend React engineer.</p>
            </footer>

            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onSave={handleUpdateTask}
                    onDelete={handleDeleteTask}
                    onClose={() => setEditingTask(null)}
                />
            )}
        </div>
    );
};

export default App;
