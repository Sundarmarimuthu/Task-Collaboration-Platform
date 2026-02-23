import React, { useState, useMemo } from 'react';
import { Priority } from '../types.js';
import TaskCard from './TaskCard.jsx';

const columnStyles = {
    'To Do': 'border-t-sky-500',
    'In Progress': 'border-t-amber-500',
    'Done': 'border-t-emerald-500',
};

const priorityOrder = {
    [Priority.Urgent]: 4,
    [Priority.High]: 3,
    [Priority.Medium]: 2,
    [Priority.Low]: 1,
};

const KanbanColumn = ({ column, tasks, onEditTask }) => {
    const [sortBy, setSortBy] = useState('priority');

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            if (sortBy === 'priority') {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            if (sortBy === 'dueDate') {
                if (!a.dueDate && !b.dueDate) return priorityOrder[b.priority] - priorityOrder[a.priority];
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                if (a.dueDate === b.dueDate) return priorityOrder[b.priority] - priorityOrder[a.priority];
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            }
            return 0;
        });
    }, [tasks, sortBy]);

    return (
        <div className={`bg-slate-100 dark:bg-dark-card rounded-lg shadow-md border-t-4 ${columnStyles[column.title]}`}>
            <div className="p-4 border-b border-slate-200 dark:border-dark-border flex justify-between items-center">
                <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    {column.title}
                    <span className="text-sm font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full px-2 py-0.5">
                        {tasks.length}
                    </span>
                </h2>
                <div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md py-1 px-2 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
                        aria-label={`Sort tasks in ${column.title} column`}
                    >
                        <option value="priority">By Priority</option>
                        <option value="dueDate">By Due Date</option>
                    </select>
                </div>
            </div>
            <div className="p-4 space-y-4 h-full min-h-[200px]">
                {sortedTasks.length > 0 ? (
                    sortedTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onEditTask={onEditTask} />
                    ))
                ) : (
                    <div className="text-center text-slate-500 dark:text-slate-400 pt-8">
                        <p>No tasks yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KanbanColumn;
