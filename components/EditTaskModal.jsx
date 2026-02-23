import React, { useState, useEffect } from 'react';
import { Priority, Status } from '../types.js';
import { CloseIcon, TrashIcon } from './Icons.jsx';

const formInputClass =
    'w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition duration-200';

const EditTaskModal = ({ task, onSave, onDelete, onClose }) => {
    const [formData, setFormData] = useState(task);

    useEffect(() => {
        setFormData(task);
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value === '' ? undefined : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
            onDelete(task.id);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-task-title"
        >
            <div
                className="bg-white dark:bg-dark-card rounded-xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    {/* Modal Header */}
                    <div className="p-4 border-b border-slate-200 dark:border-dark-border flex justify-between items-center">
                        <h2 id="edit-task-title" className="text-xl font-bold">Edit Task</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                            aria-label="Close modal"
                        >
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={formInputClass} required />
                        </div>
                        <div>
                            <label htmlFor="assignee" className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Assignee</label>
                            <input type="text" name="assignee" id="assignee" value={formData.assignee || ''} onChange={handleChange} placeholder="Unassigned" className={formInputClass} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Due Date</label>
                                <input type="date" name="dueDate" id="dueDate" value={formData.dueDate || ''} onChange={handleChange} className={formInputClass} />
                            </div>
                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Priority</label>
                                <select name="priority" id="priority" value={formData.priority} onChange={handleChange} className={formInputClass}>
                                    {Object.values(Priority).map((p) => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Status</label>
                            <select name="status" id="status" value={formData.status} onChange={handleChange} className={formInputClass}>
                                {Object.values(Status).map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-dark-border flex justify-between items-center">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition"
                            aria-label="Delete task"
                        >
                            <TrashIcon className="w-4 h-4" />
                            Delete
                        </button>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-semibold bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-secondary rounded-lg transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;
