import React from 'react';
import { Priority } from '../types.js';
import { UserIcon, CalendarIcon, FlagIcon } from './Icons.jsx';

const priorityStyles = {
    [Priority.Low]: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-800 dark:text-green-300', icon: 'text-green-500' },
    [Priority.Medium]: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-800 dark:text-yellow-300', icon: 'text-yellow-500' },
    [Priority.High]: { bg: 'bg-orange-100 dark:bg-orange-900/50', text: 'text-orange-800 dark:text-orange-300', icon: 'text-orange-500' },
    [Priority.Urgent]: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-300', icon: 'text-red-500' },
};

const TaskCard = ({ task, onEditTask }) => {
    const styles = priorityStyles[task.priority];

    const formattedDueDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        : null;

    return (
        <div
            onClick={() => onEditTask(task)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onEditTask(task)}
            role="button"
            tabIndex={0}
            aria-label={`Edit task: ${task.title}`}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-dark-border hover:shadow-md hover:border-brand-primary dark:hover:border-brand-primary transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
            <p className="font-semibold text-slate-900 dark:text-slate-100">{task.title}</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full font-medium ${styles.bg} ${styles.text}`}>
                    <FlagIcon className={`w-3.5 h-3.5 ${styles.icon}`} />
                    {task.priority}
                </div>

                {task.assignee && (
                    <div className="flex items-center gap-1.5">
                        <UserIcon className="w-4 h-4" />
                        <span>{task.assignee}</span>
                    </div>
                )}

                {formattedDueDate && (
                    <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formattedDueDate}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
