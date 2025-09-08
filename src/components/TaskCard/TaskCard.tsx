import React from 'react';
import { Task, ColumnType } from '../../types';
import { formatDate } from '../../utils/helpers';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  column: ColumnType;
  onDelete: (taskId: string, column: ColumnType) => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  dragHandlers?: {
    draggable: boolean;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  column,
  onDelete,
  onMoveLeft,
  onMoveRight,
  dragHandlers,
  isDragging = false
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id, column);
    }
  };

  const handleMoveLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveLeft?.();
  };

  const handleMoveRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveRight?.();
  };

  return (
    <div
      className={`task-card ${isDragging ? 'task-card--dragging' : ''}`}
      {...dragHandlers}
      role="article"
      aria-label={`Task: ${task.title}`}
    >
      <div className="task-card__header">
        <h3 className="task-card__title" title={task.title}>
          {task.title}
        </h3>
        <button
          className="task-card__delete-btn"
          onClick={handleDelete}
          aria-label={`Delete task: ${task.title}`}
          title="Delete task"
        >
          ×
        </button>
      </div>
      
      <div className="task-card__meta">
        <span className="task-card__date" title={`Created: ${formatDate(task.createdAt)}`}>
          {formatDate(task.createdAt)}
        </span>
      </div>

      <div className="task-card__actions">
        {onMoveLeft && (
          <button
            className="task-card__move-btn task-card__move-btn--left"
            onClick={handleMoveLeft}
            aria-label="Move task to previous column"
            title="Move left"
          >
            ←
          </button>
        )}
        
        {onMoveRight && (
          <button
            className="task-card__move-btn task-card__move-btn--right"
            onClick={handleMoveRight}
            aria-label="Move task to next column"
            title="Move right"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

