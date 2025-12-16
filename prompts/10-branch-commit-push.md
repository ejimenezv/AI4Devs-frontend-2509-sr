# Prompt 10: Branch, Commit and Push

## Instructions for Claude Code

Create a new branch, commit all changes, and push to the remote repository.

### Context:
- Branch naming convention: `frontend-EJV` (as specified in activity.md)
- Main branch: `main`
- Remote: origin

### Tasks:

1. **Create new branch**:
   ```bash
   git checkout -b frontend-EJV
   ```

2. **Verify all files are ready**:
   ```bash
   git status
   ```

3. **Stage all changes**:
   ```bash
   git add .
   ```

4. **Create commit** with descriptive message:
   ```bash
   git commit -m "feat: Implement kanban board for position candidates management

   - Add Position page with kanban view for managing candidates
   - Implement drag-and-drop functionality using @dnd-kit
   - Create API service for position and candidate operations
   - Add responsive design for mobile devices
   - Include unit tests for components
   - Add project documentation

   Components created:
   - Position.tsx: Main kanban board page
   - KanbanColumn.tsx: Draggable column component
   - CandidateCard.tsx: Draggable candidate card

   API integration:
   - GET /positions/:id/interviewFlow
   - GET /positions/:id/candidates
   - PUT /candidates/:id/stage"
   ```

5. **Push to remote**:
   ```bash
   git push -u origin frontend-EJV
   ```

6. **Verify push was successful**

### Files that should be committed:
- `documentation/architecture.md`
- `documentation/backend.md`
- `documentation/frontend.md`
- `frontend/src/components/Position.tsx`
- `frontend/src/components/Position.css`
- `frontend/src/components/KanbanColumn.tsx`
- `frontend/src/components/CandidateCard.tsx`
- `frontend/src/services/positionService.ts`
- `frontend/src/App.js` (updated)
- `frontend/package.json` (updated)
- `frontend/package-lock.json` (updated)
- `prompts/prompts-EJV.md`
- `prompts/*.md` (prompt files)
- Test files

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 10" section with:
- The actual prompt executed
- Git commands executed and output
- Remote branch URL (if available)
- Mark checkboxes as completed

### Next Steps (Manual):
After pushing, create a Pull Request on GitHub:
1. Go to the repository on GitHub
2. Click "Compare & pull request"
3. Add description and submit PR
