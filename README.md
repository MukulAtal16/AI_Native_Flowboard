# FlowBoard - Lightweight Kanban Task Management

A modern, responsive Kanban board application built with React and TypeScript, featuring native HTML5 drag-and-drop functionality and localStorage persistence.

## 🚀 Features

- **Three-Column Layout**: To Do, In Progress, and Done columns
- **Task Management**: Add, move, and delete tasks with ease
- **Drag & Drop**: Native HTML5 drag-and-drop without external libraries
- **Button Navigation**: Alternative task movement using arrow buttons
- **Persistent Storage**: Tasks are saved to localStorage automatically
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation and screen reader support
- **Modern UI**: Clean, professional design with smooth animations
- **TypeScript**: Full type safety throughout the application

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety and better developer experience
- **CSS3** - Custom CSS with modern features (Grid, Flexbox, CSS Variables)
- **HTML5 Drag API** - Native drag-and-drop implementation
- **localStorage** - Client-side data persistence
- **React Scripts** - Zero-configuration build setup

## 📋 Requirements Met

✅ **Three fixed columns** (To Do, In Progress, Done)  
✅ **Add tasks** to the To Do column  
✅ **Move tasks** between columns (drag-drop AND buttons)  
✅ **Delete tasks** from any column  
✅ **Component state management** with React hooks  
✅ **localStorage persistence** - no external API needed  
✅ **No external drag-drop libraries** - pure HTML5 implementation  
✅ **Runs with `npm run start`**  
✅ **TypeScript** for better code quality  

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation & Running

1. **Clone or download** this repository
2. **Navigate** to the project directory
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```
5. **Open your browser** to `http://localhost:3000`

The application will automatically open in your default browser and reload when you make changes.

## 📱 Usage Guide

### Adding Tasks
1. Click the **"+ Add a task"** button in the To Do column
2. Enter your task title (up to 100 characters)
3. Click **"Add Task"** or press Enter
4. The task appears in the To Do column

### Moving Tasks
**Method 1: Drag & Drop**
- Click and drag any task to a different column
- Visual feedback shows valid drop zones
- Release to move the task

**Method 2: Arrow Buttons**
- Hover over a task to see arrow buttons
- Click **←** to move left or **→** to move right
- Tasks move between adjacent columns

### Deleting Tasks
- Click the **×** button on any task
- Confirm the deletion in the popup dialog
- Task is permanently removed

### Board Management
- **Reset Board**: Click "Reset Board" to clear all tasks
- **Statistics**: View task counts in the header
- **Auto-save**: All changes are saved automatically

## 🏗️ Architecture Overview

### Component Hierarchy
```
App
└── Board
    ├── AddTaskForm (in To Do column)
    ├── Column (×3)
    │   └── TaskCard (multiple)
    └── DragOverlay (when dragging)
```

### State Management
- **useBoardState**: Custom hook managing all board operations
- **useDragAndDrop**: Custom hook for drag-and-drop functionality
- **useReducer**: Centralized state updates with actions
- **localStorage**: Automatic persistence layer

### Key Design Patterns
- **Custom Hooks**: Separation of concerns and reusability
- **Reducer Pattern**: Predictable state updates
- **Compound Components**: Flexible component composition
- **Accessibility First**: ARIA labels, keyboard navigation, screen reader support

## 🎨 Design Decisions

### Why Custom Drag & Drop?
- **No external dependencies** as per requirements
- **Better performance** - no library overhead
- **Full control** over UX and accessibility
- **Native browser support** for modern features

### State Management Choice
- **useReducer** over useState for complex state
- **Custom hooks** for business logic separation
- **TypeScript interfaces** for type safety
- **Immutable updates** for predictable behavior

### CSS Architecture
- **Component-scoped CSS** for maintainability
- **CSS Grid & Flexbox** for responsive layouts
- **CSS Custom Properties** for theming
- **Mobile-first** responsive design

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (not recommended)

## 📊 Performance Features

- **Optimized Re-renders**: Proper React patterns to minimize updates
- **Efficient Drag Handling**: Event delegation and cleanup
- **Lazy State Updates**: Debounced localStorage writes
- **Memory Management**: Proper event listener cleanup

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and live regions
- **High Contrast Mode**: Supports system preferences
- **Reduced Motion**: Respects user motion preferences
- **Focus Management**: Clear focus indicators and logical tab order

## 📱 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

## 🐛 Known Limitations

- Tasks are stored locally (cleared if browser data is cleared)
- No user authentication or multi-user support
- No task priorities or due dates
- No task descriptions or attachments

## 🔮 Future Enhancements

- Task search and filtering
- Task priorities and labels
- Keyboard shortcuts
- Export/import functionality
- Dark mode theme
- Task templates

## 📄 License

This project is created for educational purposes as part of an AI Native development assignment.

---

**Built with ❤️ using React, TypeScript, and modern web standards**