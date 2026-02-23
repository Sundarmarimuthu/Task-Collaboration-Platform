import React from 'react';
import KanbanColumn from './KanbanColumn.jsx';

const KanbanBoard = ({ tasks, columns, onEditTask }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {columns.map((column) => {
                const columnTasks = tasks.filter((task) => task.status === column.id);
                return (
                    <KanbanColumn
                        key={column.id}
                        column={column}
                        tasks={columnTasks}
                        onEditTask={onEditTask}
                    />
                );
            })}
        </div>
    );
};

export default KanbanBoard;
