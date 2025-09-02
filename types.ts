export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}

export enum Status {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee?: string;
  dueDate?: string;
}

export interface Column {
  id: Status;
  title: string;
}