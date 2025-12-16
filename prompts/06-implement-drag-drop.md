# Prompt 6: Implement Drag and Drop

## Instructions for Claude Code

Add drag-and-drop functionality to the kanban board using @dnd-kit library.

### Context:
- Reference `documentation/frontend.md` for component structure
- @dnd-kit was installed in Prompt 2
- Components created in Prompt 5

### @dnd-kit Setup Required:

1. **DndContext** - Wraps the entire kanban board
2. **useDroppable** - Makes columns droppable targets
3. **useDraggable** - Makes candidate cards draggable
4. **DragOverlay** - Shows card preview while dragging

### Tasks:

1. **Update Position.tsx**:
   - Wrap kanban board with `<DndContext>`
   - Add `onDragStart`, `onDragEnd` handlers
   - Track active dragging card state
   - Add `<DragOverlay>` for drag preview

2. **Update KanbanColumn.tsx**:
   - Use `useDroppable` hook
   - Add droppable area styling
   - Visual feedback when card hovers over column

3. **Update CandidateCard.tsx**:
   - Use `useDraggable` hook
   - Add drag handle styling
   - Visual feedback during drag (opacity change)

### Implementation Pattern:
```typescript
// Position.tsx
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (over && active.id !== over.id) {
    // Move candidate to new column
  }
};

// KanbanColumn.tsx
import { useDroppable } from '@dnd-kit/core';
const { setNodeRef, isOver } = useDroppable({ id: step.id });

// CandidateCard.tsx
import { useDraggable } from '@dnd-kit/core';
const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: candidate.id });
```

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 5" section with:
- The actual prompt executed
- Description of drag-and-drop implementation
- Mark checkbox as completed

### Expected Changes:
- `frontend/src/components/Position.tsx` (updated)
- `frontend/src/components/KanbanColumn.tsx` (updated)
- `frontend/src/components/CandidateCard.tsx` (updated)
