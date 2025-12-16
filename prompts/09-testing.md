# Prompt 9: Testing

## Instructions for Claude Code

Create unit tests for the kanban components to ensure functionality works correctly.

### Context:
- Reference `documentation/frontend.md` for testing patterns
- React Testing Library is the standard for React component testing
- Jest is likely the test runner (check package.json)

### Tasks:

1. **Check if testing dependencies exist**, if not install:
   ```bash
   npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

2. **Create test file** `frontend/src/components/__tests__/Position.test.tsx`

3. **Test cases to implement**:

   ```typescript
   // Position.test.tsx
   describe('Position Component', () => {
     it('renders loading state initially');
     it('renders position title after data loads');
     it('renders correct number of columns');
     it('renders candidates in correct columns');
     it('handles API error gracefully');
   });

   // CandidateCard.test.tsx
   describe('CandidateCard Component', () => {
     it('displays candidate name');
     it('displays candidate score');
     it('applies correct score color class');
   });

   // KanbanColumn.test.tsx
   describe('KanbanColumn Component', () => {
     it('renders column header');
     it('renders candidate cards');
     it('shows empty state when no candidates');
   });
   ```

4. **Mock the API service**:
   ```typescript
   jest.mock('../../services/positionService', () => ({
     getPositionInterviewFlow: jest.fn(),
     getPositionCandidates: jest.fn(),
     updateCandidateStage: jest.fn(),
   }));
   ```

5. **Run tests** to verify:
   ```bash
   npm test
   ```

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 8" section with:
- The actual prompt executed
- Test coverage summary
- Any test failures and resolutions
- Mark checkbox as completed

### Expected Output:
- `frontend/src/components/__tests__/Position.test.tsx`
- `frontend/src/components/__tests__/CandidateCard.test.tsx` (optional)
- `frontend/src/components/__tests__/KanbanColumn.test.tsx` (optional)
