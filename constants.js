import { Priority, Status } from './types.js';

export const INITIAL_TASKS = [
    {
        id: 'task-1',
        title: 'Design the new dashboard interface',
        status: Status.InProgress,
        priority: Priority.High,
        assignee: 'Alice',
        dueDate: '2024-08-15',
    },
    {
        id: 'task-2',
        title: 'Develop API for user authentication',
        status: Status.ToDo,
        priority: Priority.Urgent,
        assignee: 'Bob',
        dueDate: '2024-08-10',
    },
    {
        id: 'task-3',
        title: 'Write documentation for the new feature',
        status: Status.ToDo,
        priority: Priority.Medium,
        assignee: 'Charlie',
    },
    {
        id: 'task-4',
        title: 'Review and merge pull requests',
        status: Status.Done,
        priority: Priority.Low,
        assignee: 'Alice',
        dueDate: '2024-07-30',
    },
    {
        id: 'task-5',
        title: 'Fix bug in the payment processing module',
        status: Status.InProgress,
        priority: Priority.Urgent,
        assignee: 'David',
        dueDate: '2024-08-05',
    },
];

export const INITIAL_COLUMNS = [
    { id: Status.ToDo, title: 'To Do' },
    { id: Status.InProgress, title: 'In Progress' },
    { id: Status.Done, title: 'Done' },
];
