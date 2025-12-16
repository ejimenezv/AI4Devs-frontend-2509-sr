# Prompt 8: Styles and Responsive Design

## Instructions for Claude Code

Create CSS styles for the kanban board with responsive design for mobile devices.

### Context:
- Reference `example.avif` for visual design inspiration
- Reference `documentation/frontend.md` for styling patterns
- Project uses Bootstrap CSS framework

### Design Requirements:

1. **Desktop Layout (> 768px)**:
   - Horizontal scrolling kanban board
   - Columns side by side
   - Fixed column width (~280px)
   - Cards with consistent sizing

2. **Mobile Layout (< 768px)**:
   - Vertical stacking of columns
   - Full width columns
   - Collapsible column headers (optional)
   - Touch-friendly card sizes

### Tasks:

1. **Create** `frontend/src/components/Position.css`

2. **Styles to include**:

   ```css
   /* Header styles */
   .position-header { }
   .back-button { }
   .position-title { }

   /* Kanban board container */
   .kanban-board { }

   /* Column styles */
   .kanban-column { }
   .kanban-column-header { }
   .kanban-column-content { }
   .kanban-column.is-over { } /* Drop target highlight */

   /* Card styles */
   .candidate-card { }
   .candidate-card.is-dragging { }
   .candidate-name { }
   .candidate-score { }

   /* Responsive breakpoints */
   @media (max-width: 768px) { }
   ```

3. **Import CSS** in Position.tsx

4. **Visual enhancements**:
   - Smooth transitions on drag
   - Hover effects on cards
   - Column background colors
   - Score badge styling (color-coded)

### Color Scheme (Bootstrap-compatible):
- Column backgrounds: Light gray (#f8f9fa)
- Card backgrounds: White
- Primary accent: Bootstrap primary (#0d6efd)
- Score colors:
  - High (4-5): Success green
  - Medium (2-3): Warning yellow
  - Low (0-1): Danger red

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 7" section with:
- The actual prompt executed
- Summary of styles created
- Responsive breakpoints implemented
- Mark checkbox as completed

### Expected Output:
- `frontend/src/components/Position.css`
