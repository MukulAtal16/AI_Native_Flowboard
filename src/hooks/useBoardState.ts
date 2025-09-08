import { useReducer, useEffect } from 'react';
import { BoardState, BoardAction, ColumnType, Task, STORAGE_KEY } from '../types';
import { generateId } from '../utils/helpers';

/**
 * Initial board state with empty columns
 */
const initialState: BoardState = {
  columns: {
    todo: { id: 'todo', title: 'To Do', tasks: [] },
    inProgress: { id: 'inProgress', title: 'In Progress', tasks: [] },
    done: { id: 'done', title: 'Done', tasks: [] }
  }
};

/**
 * Board state reducer for managing all board operations
 */
function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask: Task = {
        id: generateId(),
        title: action.payload.title,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return {
        ...state,
        columns: {
          ...state.columns,
          todo: {
            ...state.columns.todo,
            tasks: [...state.columns.todo.tasks, newTask]
          }
        }
      };
    }

    case 'MOVE_TASK': {
      const { taskId, sourceColumn, targetColumn } = action.payload;
      
      // Find the task in the source column
      const sourceColumnData = state.columns[sourceColumn];
      const taskToMove = sourceColumnData.tasks.find(task => task.id === taskId);
      
      if (!taskToMove) return state;

      // Remove task from source column
      const updatedSourceTasks = sourceColumnData.tasks.filter(task => task.id !== taskId);
      
      // Add task to target column with updated timestamp
      const updatedTask = { ...taskToMove, updatedAt: new Date() };
      const targetColumnData = state.columns[targetColumn];
      const updatedTargetTasks = [...targetColumnData.tasks, updatedTask];

      return {
        ...state,
        columns: {
          ...state.columns,
          [sourceColumn]: {
            ...sourceColumnData,
            tasks: updatedSourceTasks
          },
          [targetColumn]: {
            ...targetColumnData,
            tasks: updatedTargetTasks
          }
        }
      };
    }

    case 'DELETE_TASK': {
      const { taskId, column } = action.payload;
      const columnData = state.columns[column];
      const updatedTasks = columnData.tasks.filter(task => task.id !== taskId);

      return {
        ...state,
        columns: {
          ...state.columns,
          [column]: {
            ...columnData,
            tasks: updatedTasks
          }
        }
      };
    }

    case 'LOAD_STATE': {
      return action.payload;
    }

    case 'RESET_BOARD': {
      return initialState;
    }

    default:
      return state;
  }
}

/**
 * Custom hook for managing board state with localStorage persistence
 */
export function useBoardState() {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Convert date strings back to Date objects
        Object.keys(parsedState.columns).forEach((columnKey) => {
          const column = parsedState.columns[columnKey as ColumnType];
          column.tasks.forEach((task: Task) => {
            task.createdAt = new Date(task.createdAt);
            task.updatedAt = new Date(task.updatedAt);
          });
        });
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error('Failed to load board state from localStorage:', error);
    }
  }, []);

  // Save state to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save board state to localStorage:', error);
    }
  }, [state]);

  // Action creators
  const addTask = (title: string) => {
    if (title.trim()) {
      dispatch({ type: 'ADD_TASK', payload: { title: title.trim() } });
    }
  };

  const moveTask = (taskId: string, sourceColumn: ColumnType, targetColumn: ColumnType) => {
    if (sourceColumn !== targetColumn) {
      dispatch({ type: 'MOVE_TASK', payload: { taskId, sourceColumn, targetColumn } });
    }
  };

  const deleteTask = (taskId: string, column: ColumnType) => {
    dispatch({ type: 'DELETE_TASK', payload: { taskId, column } });
  };

  const resetBoard = () => {
    dispatch({ type: 'RESET_BOARD' });
  };

  return {
    state,
    actions: {
      addTask,
      moveTask,
      deleteTask,
      resetBoard
    }
  };
}

