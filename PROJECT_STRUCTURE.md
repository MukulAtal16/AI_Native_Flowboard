# FlowBoard - Project Structure

This document explains the organization and architecture of the FlowBoard application.

## 📁 Directory Structure

```
AI_Native_Assignment3/
├── public/                     # Static assets
│   ├── index.html             # HTML template
│   ├── favicon.ico            # App icon
│   └── manifest.json          # PWA manifest
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── Board/            # Main board component
│   │   │   ├── Board.tsx     # Board component logic
│   │   │   └── Board.css     # Board styles
│   │   ├── Column/           # Column component
│   │   │   ├── Column.tsx    # Column component logic
│   │   │   └── Column.css    # Column styles
│   │   ├── TaskCard/         # Task card component
│   │   │   ├── TaskCard.tsx  # Task card logic
│   │   │   └── TaskCard.css  # Task card styles
│   │   └── AddTaskForm/      # Add task form component
│   │       ├── AddTaskForm.tsx # Form component logic
│   │       └── AddTaskForm.css # Form styles
│   ├── hooks/                # Custom React hooks
│   │   ├── useBoardState.ts  # Board state management
│   │   └── useDragAndDrop.ts # Drag & drop functionality
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # All type definitions
│   ├── utils/                # Utility functions
│   │   └── helpers.ts        # Helper functions
│   ├── App.tsx               # Root component
│   ├── App.css               # Global styles
│   ├── index.tsx             # Application entry point
│   └── index.css             # Base CSS styles
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Project documentation
├── PROJECT_STRUCTURE.md      # This file
├── ARCHITECTURE.md           # Architecture documentation
└── CHAT_HISTORY.md           # AI development log
```

## 🏗️ Architecture Layers

### 1. Presentation Layer (`/components`)
**Responsibility**: UI components and user interactions

- **Board**: Main container component
  - Orchestrates the entire application
  - Manages global state and actions
  - Provides drag-and-drop context
  - Handles board-level operations (reset, statistics)

- **Column**: Individual column component
  - Renders column header with statistics
  - Manages drop zone functionality
  - Handles column-specific interactions
  - Provides empty state messaging

- **TaskCard**: Individual task component
  - Displays task information
  - Handles task-level actions (delete, move)
  - Implements draggable behavior
  - Provides accessibility features

- **AddTaskForm**: Task creation component
  - Expandable form interface
  - Input validation and error handling
  - Keyboard shortcuts and accessibility
  - Loading states and user feedback

### 2. Business Logic Layer (`/hooks`)
**Responsibility**: Application logic and state management

- **useBoardState**: Core state management
  - Implements reducer pattern for state updates
  - Handles all CRUD operations on tasks
  - Manages localStorage persistence
  - Provides action creators for components

- **useDragAndDrop**: Drag & drop functionality
  - Manages drag state and events
  - Provides drag handlers for components
  - Implements drop zone logic
  - Handles drag feedback and validation

### 3. Data Layer (`/types` & `/utils`)
**Responsibility**: Data structures and utility functions

- **Types**: TypeScript definitions
  - Task and Column interfaces
  - State and action type definitions
  - Component prop interfaces
  - Drag state types

- **Utils**: Helper functions
  - ID generation for tasks
  - Date formatting utilities
  - Text validation and truncation
  - Statistics calculations

## 🔄 Data Flow

### State Management Flow
```
User Action → Component → Hook → Reducer → State Update → Re-render
                                    ↓
                              localStorage ← Persistence
```

### Drag & Drop Flow
```
Drag Start → Update Drag State → Visual Feedback → Drop → Move Task → Update Board State
```

### Task Lifecycle
```
Create → Add to Todo → Move to In Progress → Move to Done → Delete
   ↓         ↓              ↓                   ↓         ↓
localStorage localStorage localStorage    localStorage localStorage
```

## 🎯 Component Responsibilities

### Board Component
- **State Management**: Owns and manages global application state
- **Event Coordination**: Coordinates between child components
- **Layout**: Provides main application layout and structure
- **Statistics**: Calculates and displays board statistics
- **Actions**: Provides board-level actions (reset, etc.)

### Column Component
- **Display**: Renders column header, tasks, and empty states
- **Drop Zone**: Implements drop zone for drag-and-drop
- **Statistics**: Shows column-specific statistics
- **Task Container**: Manages task list rendering

### TaskCard Component
- **Display**: Shows task information and metadata
- **Interactions**: Handles task-specific actions
- **Drag Source**: Implements draggable behavior
- **Accessibility**: Provides ARIA labels and keyboard support

### AddTaskForm Component
- **Input Handling**: Manages form input and validation
- **State Management**: Handles form-specific state
- **User Experience**: Provides smooth expand/collapse behavior
- **Error Handling**: Shows validation errors and feedback

## 🔧 Technical Patterns

### Custom Hooks Pattern
- **Separation of Concerns**: Business logic separated from UI
- **Reusability**: Hooks can be reused across components
- **Testability**: Logic can be tested independently
- **Maintainability**: Easier to modify and extend

### Reducer Pattern
- **Predictable Updates**: All state changes go through reducer
- **Action-Based**: Clear action types for all operations
- **Immutability**: State updates are immutable
- **Debugging**: Easy to trace state changes

### Component Composition
- **Single Responsibility**: Each component has one clear purpose
- **Props Interface**: Well-defined interfaces between components
- **Event Delegation**: Parent components handle child events
- **Flexible Architecture**: Easy to add new features

## 📦 Module Dependencies

### Internal Dependencies
```
Board → Column → TaskCard
Board → AddTaskForm
Board → useBoardState → useDragAndDrop
All Components → types/index
All Components → utils/helpers
```

### External Dependencies
- **React**: Core framework and hooks
- **TypeScript**: Type system and compilation
- **CSS**: Styling and animations
- **HTML5 Drag API**: Native drag-and-drop

## 🚀 Build Process

### Development
1. **TypeScript Compilation**: `.tsx` → `.js`
2. **CSS Processing**: CSS modules and optimization
3. **Bundle Creation**: Webpack bundling
4. **Hot Reload**: Development server with HMR

### Production
1. **Type Checking**: Full TypeScript validation
2. **Code Optimization**: Minification and tree shaking
3. **Asset Optimization**: CSS and image optimization
4. **Bundle Analysis**: Size analysis and optimization

## 🔍 Code Organization Principles

### File Naming
- **Components**: PascalCase (e.g., `TaskCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useBoardState.ts`)
- **Types**: camelCase (e.g., `index.ts`)
- **Utilities**: camelCase (e.g., `helpers.ts`)

### Import Organization
1. **React imports** (React, hooks)
2. **External libraries** (none in this project)
3. **Internal components** (relative imports)
4. **Types and interfaces**
5. **Utilities and helpers**
6. **Styles** (CSS imports last)

### Code Structure
- **Interfaces first**: Type definitions at top of file
- **Component logic**: Main component function
- **Event handlers**: Grouped together
- **Render logic**: JSX at bottom
- **Exports**: Default export at end

This structure promotes maintainability, testability, and scalability while keeping the codebase organized and easy to navigate.

