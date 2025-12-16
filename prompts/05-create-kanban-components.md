# Prompt 5: Create Kanban Base Components

## Instructions for Claude Code

Create the base components for the kanban board view without drag-and-drop functionality yet.

### Context:
- Reference `documentation/frontend.md` for component patterns
- Reference the example image at `example.avif` for visual design
- Use React-Bootstrap for styling (consistent with existing components)

### Visual Requirements (from example.avif):
- Header with back arrow and position title
- Horizontal columns for each interview phase
- Candidate cards showing name and average score
- Clean, professional appearance

### Components to create:

1. **Position.tsx** - Main page component
   - Header with back navigation arrow (links to /positions)
   - Position title display
   - Container for kanban columns
   - Loading and error states

2. **KanbanColumn.tsx** - Column component
   - Column header with phase name
   - Container for candidate cards
   - Visual styling for column background

3. **CandidateCard.tsx** - Card component
   - Candidate full name
   - Average score display (with visual indicator)
   - Card styling with shadow/border

### Tasks:

1. **Create** `frontend/src/components/Position.tsx`
2. **Create** `frontend/src/components/KanbanColumn.tsx`
3. **Create** `frontend/src/components/CandidateCard.tsx`
4. **Use mock data** initially (will connect to API in next prompt)
5. **Add route** in `App.js` for `/position/:id`

### TypeScript Props Interfaces:
```typescript
// Position.tsx - uses route params
// KanbanColumn.tsx
interface KanbanColumnProps {
  step: InterviewStep;
  candidates: Candidate[];
}

// CandidateCard.tsx
interface CandidateCardProps {
  candidate: Candidate;
}
```

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 4" section with:
- The actual prompt executed
- List of created components with brief descriptions
- Mark checkboxes as completed

### Expected Output:
- `frontend/src/components/Position.tsx`
- `frontend/src/components/KanbanColumn.tsx`
- `frontend/src/components/CandidateCard.tsx`
- Updated `frontend/src/App.js` with new route
