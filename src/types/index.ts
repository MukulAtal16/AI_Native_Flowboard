/**
 * Core types and interfaces for FlowBoard application
 */

export interface Task {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ColumnType = 'todo' | 'inProgress' | 'done';

export interface Column {
  id: ColumnType;
  title: string;
  tasks: Task[];
}

export interface BoardState {
  columns: Record<ColumnType, Column>;
}

export interface DragState {
  isDragging: boolean;
  draggedTask: Task | null;
  sourceColumn: ColumnType | null;
  targetColumn: ColumnType | null;
}

// Action types for state management
export type BoardAction =
  | { type: 'ADD_TASK'; payload: { title: string } }
  | { type: 'MOVE_TASK'; payload: { taskId: string; sourceColumn: ColumnType; targetColumn: ColumnType } }
  | { type: 'DELETE_TASK'; payload: { taskId: string; column: ColumnType } }
  | { type: 'LOAD_STATE'; payload: BoardState }
  | { type: 'RESET_BOARD' };

// Constants
export const COLUMN_CONFIG: Record<ColumnType, { title: string; color: string }> = {
  todo: { title: 'To Do', color: '#e3f2fd' },
  inProgress: { title: 'In Progress', color: '#fff3e0' },
  done: { title: 'Done', color: '#e8f5e8' }
};

export const STORAGE_KEY = 'flowboard-data';

