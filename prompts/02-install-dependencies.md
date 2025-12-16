# Prompt 2: Install Required Dependencies

## Instructions for Claude Code

Install the necessary dependencies for implementing drag-and-drop functionality in the kanban board.

### Context:
- Reference `documentation/frontend.md` for current dependencies
- The project uses React 18 with TypeScript
- UI framework is React-Bootstrap

### Tasks:

1. **Navigate to frontend folder** and install:
   - `@dnd-kit/core` - Core drag and drop functionality
   - `@dnd-kit/sortable` - Sortable preset for lists
   - `@dnd-kit/utilities` - Utility functions

2. **Verify installation** by checking package.json

3. **Document the installed versions**

### Commands to execute:
```bash
cd frontend
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 2" section with:
- The actual prompt executed
- The npm install output
- Installed package versions
- Mark checkbox as completed

### Why @dnd-kit?
- Modern, lightweight drag-and-drop library
- Built for React with hooks
- Excellent TypeScript support
- Better performance than react-beautiful-dnd
- Active maintenance
