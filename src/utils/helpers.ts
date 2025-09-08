/**
 * Utility functions for FlowBoard application
 */

/**
 * Generate a unique ID for tasks
 */
export function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Validate task title
 */
export function validateTaskTitle(title: string): { isValid: boolean; error?: string } {
  const trimmedTitle = title.trim();
  
  if (!trimmedTitle) {
    return { isValid: false, error: 'Task title cannot be empty' };
  }
  
  if (trimmedTitle.length > 100) {
    return { isValid: false, error: 'Task title must be 100 characters or less' };
  }
  
  return { isValid: true };
}

/**
 * Get column statistics
 */
export function getColumnStats(tasks: any[]) {
  return {
    total: tasks.length,
    recent: tasks.filter(task => {
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      return new Date(task.createdAt) > dayAgo;
    }).length
  };
}

