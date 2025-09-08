import { useState, useCallback } from 'react';
import { Task, ColumnType, DragState } from '../types';

/**
 * Custom hook for managing drag and drop functionality using HTML5 Drag API
 */
export function useDragAndDrop() {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedTask: null,
    sourceColumn: null,
    targetColumn: null
  });

  /**
   * Handle drag start event
   */
  const handleDragStart = useCallback((task: Task, sourceColumn: ColumnType) => {
    setDragState({
      isDragging: true,
      draggedTask: task,
      sourceColumn,
      targetColumn: null
    });
  }, []);

  /**
   * Handle drag end event
   */
  const handleDragEnd = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedTask: null,
      sourceColumn: null,
      targetColumn: null
    });
  }, []);

  /**
   * Handle drag over event (for drop zones)
   */
  const handleDragOver = useCallback((e: React.DragEvent, targetColumn: ColumnType) => {
    e.preventDefault(); // Allow drop
    setDragState(prev => ({
      ...prev,
      targetColumn
    }));
  }, []);

  /**
   * Handle drag leave event
   */
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Only clear target if we're leaving the drop zone completely
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragState(prev => ({
        ...prev,
        targetColumn: null
      }));
    }
  }, []);

  /**
   * Handle drop event
   */
  const handleDrop = useCallback((
    e: React.DragEvent,
    targetColumn: ColumnType,
    onTaskMove: (taskId: string, sourceColumn: ColumnType, targetColumn: ColumnType) => void
  ) => {
    e.preventDefault();
    
    if (dragState.draggedTask && dragState.sourceColumn && dragState.sourceColumn !== targetColumn) {
      onTaskMove(dragState.draggedTask.id, dragState.sourceColumn, targetColumn);
    }
    
    handleDragEnd();
  }, [dragState, handleDragEnd]);

  /**
   * Get drag event handlers for a draggable task
   */
  const getDragHandlers = useCallback((task: Task, sourceColumn: ColumnType) => ({
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      // Set drag data for accessibility and fallback
      e.dataTransfer.setData('text/plain', task.id);
      e.dataTransfer.effectAllowed = 'move';
      handleDragStart(task, sourceColumn);
    },
    onDragEnd: handleDragEnd
  }), [handleDragStart, handleDragEnd]);

  /**
   * Get drop event handlers for a drop zone
   */
  const getDropHandlers = useCallback((
    targetColumn: ColumnType,
    onTaskMove: (taskId: string, sourceColumn: ColumnType, targetColumn: ColumnType) => void
  ) => ({
    onDragOver: (e: React.DragEvent) => handleDragOver(e, targetColumn),
    onDragLeave: handleDragLeave,
    onDrop: (e: React.DragEvent) => handleDrop(e, targetColumn, onTaskMove)
  }), [handleDragOver, handleDragLeave, handleDrop]);

  /**
   * Check if a column is a valid drop target
   */
  const isValidDropTarget = useCallback((targetColumn: ColumnType): boolean => {
    return dragState.isDragging && 
           dragState.sourceColumn !== null && 
           dragState.sourceColumn !== targetColumn;
  }, [dragState]);

  /**
   * Check if a column is currently being dragged over
   */
  const isDraggedOver = useCallback((column: ColumnType): boolean => {
    return dragState.targetColumn === column && isValidDropTarget(column);
  }, [dragState.targetColumn, isValidDropTarget]);

  return {
    dragState,
    getDragHandlers,
    getDropHandlers,
    isValidDropTarget,
    isDraggedOver
  };
}

