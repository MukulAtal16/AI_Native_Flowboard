import React from 'react';
import { Column as ColumnType, Task, ColumnType as ColumnTypeEnum } from '../../types';
import { TaskCard } from '../TaskCard/TaskCard';
import { getColumnStats } from '../../utils/helpers';
import './Column.css';

interface ColumnProps {
  column: ColumnType;
  columnType: ColumnTypeEnum;
  onDeleteTask: (taskId: string, column: ColumnTypeEnum) => void;
  onMoveTask: (taskId: string, sourceColumn: ColumnTypeEnum, targetColumn: ColumnTypeEnum) => void;
  getDragHandlers: (task: Task, sourceColumn: ColumnTypeEnum) => any;
  getDropHandlers: (targetColumn: ColumnTypeEnum, onTaskMove: any) => any;
  isDraggedOver: boolean;
  draggedTaskId?: string;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  columnType,
  onDeleteTask,
  onMoveTask,
  getDragHandlers,
  getDropHandlers,
  isDraggedOver,
  draggedTaskId
}) => {
  const stats = getColumnStats(column.tasks);

  const getMoveHandlers = (task: Task) => {
    const handlers: { onMoveLeft?: () => void; onMoveRight?: () => void } = {};

    if (columnType === 'inProgress') {
      handlers.onMoveLeft = () => onMoveTask(task.id, columnType, 'todo');
      handlers.onMoveRight = () => onMoveTask(task.id, columnType, 'done');
    } else if (columnType === 'done') {
      handlers.onMoveLeft = () => onMoveTask(task.id, columnType, 'inProgress');
    } else if (columnType === 'todo') {
      handlers.onMoveRight = () => onMoveTask(task.id, columnType, 'inProgress');
    }

    return handlers;
  };

  return (
    <div 
      className={`column ${isDraggedOver ? 'column--drag-over' : ''}`}
      data-column={columnType}
    >
      <div className="column__header">
        <h2 className="column__title">{column.title}</h2>
        <div className="column__stats">
          <span className="column__count" title={`${stats.total} total tasks`}>
            {stats.total}
          </span>
          {stats.recent > 0 && (
            <span className="column__recent" title={`${stats.recent} tasks added in the last 24 hours`}>
              +{stats.recent}
            </span>
          )}
        </div>
      </div>

      <div
        className="column__content"
        {...getDropHandlers(columnType, onMoveTask)}
        role="region"
        aria-label={`${column.title} column`}
        aria-describedby={`${columnType}-description`}
      >
        <div id={`${columnType}-description`} className="sr-only">
          Drop zone for {column.title} tasks. Contains {stats.total} tasks.
        </div>

        {column.tasks.length === 0 ? (
          <div className="column__empty">
            <p className="column__empty-text">
              {columnType === 'todo' 
                ? 'Add your first task to get started!' 
                : 'No tasks yet'}
            </p>
          </div>
        ) : (
          <div className="column__tasks">
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                column={columnType}
                onDelete={onDeleteTask}
                {...getMoveHandlers(task)}
                dragHandlers={getDragHandlers(task, columnType)}
                isDragging={draggedTaskId === task.id}
              />
            ))}
          </div>
        )}

        {isDraggedOver && (
          <div className="column__drop-indicator">
            <span>Drop task here</span>
          </div>
        )}
      </div>
    </div>
  );
};

