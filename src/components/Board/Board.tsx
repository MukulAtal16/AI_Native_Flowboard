import React, { useState } from 'react';
import { useBoardState } from '../../hooks/useBoardState';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { Column } from '../Column/Column';
import { AddTaskForm } from '../AddTaskForm/AddTaskForm';
import { ColumnType } from '../../types';
import './Board.css';

const COLUMN_ORDER: ColumnType[] = ['todo', 'inProgress', 'done'];

export const Board: React.FC = () => {
  const { state, actions } = useBoardState();
  const { dragState, getDragHandlers, getDropHandlers, isDraggedOver } = useDragAndDrop();
  const [isAddFormExpanded, setIsAddFormExpanded] = useState(false);

  const handleToggleAddForm = () => {
    setIsAddFormExpanded(!isAddFormExpanded);
  };

  const getTotalTasks = () => {
    return Object.values(state.columns).reduce((total, column) => total + column.tasks.length, 0);
  };

  const handleResetBoard = () => {
    if (window.confirm('Are you sure you want to reset the board? This will delete all tasks.')) {
      actions.resetBoard();
    }
  };

  return (
    <div className="board">
      <header className="board__header">
        <div className="board__title-section">
          <h1 className="board__title">FlowBoard</h1>
          <p className="board__subtitle">Lightweight Kanban Task Management</p>
        </div>
        
        <div className="board__stats">
          <div className="board__stat">
            <span className="board__stat-value">{getTotalTasks()}</span>
            <span className="board__stat-label">Total Tasks</span>
          </div>
          <div className="board__stat">
            <span className="board__stat-value">{state.columns.todo.tasks.length}</span>
            <span className="board__stat-label">To Do</span>
          </div>
          <div className="board__stat">
            <span className="board__stat-value">{state.columns.inProgress.tasks.length}</span>
            <span className="board__stat-label">In Progress</span>
          </div>
          <div className="board__stat">
            <span className="board__stat-value">{state.columns.done.tasks.length}</span>
            <span className="board__stat-label">Done</span>
          </div>
        </div>

        <div className="board__actions">
          <AddTaskForm
            onAddTask={actions.addTask}
            isExpanded={isAddFormExpanded}
            onToggleExpanded={handleToggleAddForm}
          />
          <button
            className="board__reset-btn"
            onClick={handleResetBoard}
            aria-label="Reset board"
            title="Reset board (delete all tasks)"
          >
            Reset Board
          </button>
        </div>
      </header>

      <main className="board__content">
        <div className="board__columns">
          {COLUMN_ORDER.map((columnType, index) => (
            <Column
              key={columnType}
              column={state.columns[columnType]}
              columnType={columnType}
              onDeleteTask={actions.deleteTask}
              onMoveTask={actions.moveTask}
              getDragHandlers={getDragHandlers}
              getDropHandlers={getDropHandlers}
              isDraggedOver={isDraggedOver(columnType)}
              draggedTaskId={dragState.draggedTask?.id}
            />
          ))}
        </div>

        {dragState.isDragging && (
          <div className="board__drag-overlay" aria-hidden="true">
            <div className="board__drag-instructions">
              Drop task in any column to move it
            </div>
          </div>
        )}
      </main>

      <footer className="board__footer">
        <p className="board__footer-text">
          Built with React & TypeScript • Drag & drop tasks between columns
        </p>
        {dragState.isDragging && (
          <p className="board__drag-hint" aria-live="polite">
            Dragging "{dragState.draggedTask?.title}" from {dragState.sourceColumn}
          </p>
        )}
      </footer>
    </div>
  );
};

