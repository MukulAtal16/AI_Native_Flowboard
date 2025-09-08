import React, { useState, useRef, useEffect } from 'react';
import { validateTaskTitle } from '../../utils/helpers';
import './AddTaskForm.css';

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onAddTask,
  isExpanded,
  onToggleExpanded
}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when form expands
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTaskTitle(title);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid task title');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      onAddTask(title);
      setTitle('');
      setError(null);
      onToggleExpanded(); // Collapse form after successful submission
    } catch (err) {
      setError('Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setError(null);
    onToggleExpanded();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isExpanded) {
    return (
      <button
        className="add-task-trigger"
        onClick={onToggleExpanded}
        aria-label="Add a new task"
      >
        <span className="add-task-trigger__icon">+</span>
        <span className="add-task-trigger__text">Add a task</span>
      </button>
    );
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit} noValidate>
      <div className="add-task-form__input-group">
        <input
          ref={inputRef}
          type="text"
          className={`add-task-form__input ${error ? 'add-task-form__input--error' : ''}`}
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null); // Clear error on typing
          }}
          onKeyDown={handleKeyDown}
          maxLength={100}
          aria-label="Task title"
          aria-describedby={error ? 'task-error' : 'task-help'}
          disabled={isSubmitting}
        />
        
        {error && (
          <div id="task-error" className="add-task-form__error" role="alert">
            {error}
          </div>
        )}
        
        <div id="task-help" className="add-task-form__help">
          {title.length}/100 characters
        </div>
      </div>

      <div className="add-task-form__actions">
        <button
          type="submit"
          className="add-task-form__submit"
          disabled={isSubmitting || !title.trim()}
          aria-label="Add task"
        >
          {isSubmitting ? (
            <>
              <span className="add-task-form__spinner" aria-hidden="true"></span>
              Adding...
            </>
          ) : (
            'Add Task'
          )}
        </button>
        
        <button
          type="button"
          className="add-task-form__cancel"
          onClick={handleCancel}
          disabled={isSubmitting}
          aria-label="Cancel adding task"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

