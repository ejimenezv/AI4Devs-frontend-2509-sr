# Prompts for AI4Devs Frontend Exercise

This folder contains a series of sequential prompts designed to be executed in Claude Code to build a kanban board interface for managing position candidates.

**Important:** This is a **frontend-focused** exercise. The backend API endpoints already exist - we only consume them.

## Prompt Files

| File | Description |
|------|-------------|
| `01-analyze-codebase.md` | Analyze project structure and create documentation |
| `02-install-dependencies.md` | Install @dnd-kit for drag-and-drop |
| `03-test-backend-endpoints.md` | **NEW** - Verify existing backend endpoints work |
| `04-create-api-service.md` | Create frontend TypeScript service to consume API |
| `05-create-kanban-components.md` | Create base React components |
| `06-implement-drag-drop.md` | Add drag-and-drop functionality |
| `07-connect-api.md` | Connect components to backend API |
| `08-styles-responsive.md` | Add CSS and responsive design |
| `09-testing.md` | Create unit tests |
| `10-branch-commit-push.md` | Git operations for submission |

## How to Execute

### Option 1: Execute prompts individually
1. Open each `.md` file in order (01 through 10)
2. Copy the content under "Instructions for Claude Code"
3. Paste into Claude Code
4. Wait for completion before moving to next prompt

### Option 2: Use the consolidated prompts file
1. Open `prompts-EJV.md`
2. Copy each prompt from the "Prompt Ejecutado" section
3. Execute in Claude Code
4. Results will be documented in the same file

## Execution Order

```
01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 07 -> 08 -> 09 -> 10
```

**Important:** Execute prompts in order. Each prompt depends on the output of previous prompts.

## Output

After executing all prompts, the following will be created:

### Documentation
- `documentation/architecture.md`
- `documentation/backend.md`
- `documentation/frontend.md`

### Components
- `frontend/src/components/Position.tsx`
- `frontend/src/components/Position.css`
- `frontend/src/components/KanbanColumn.tsx`
- `frontend/src/components/CandidateCard.tsx`

### Services
- `frontend/src/services/positionService.ts`

### Tests
- `frontend/src/components/__tests__/Position.test.tsx`

### Updated Files
- `frontend/src/App.js` (new route)
- `frontend/package.json` (new dependencies)

## API Endpoints (Backend - Already Implemented)

The following endpoints are provided by the backend team:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/positions/:id/interviewFlow` | Get position name and interview steps |
| GET | `/positions/:id/candidates` | Get all candidates for a position |
| PUT | `/candidates/:id/stage` | Update candidate's interview stage |

## Deliverables

As specified in `activity.md`:
- Branch: `frontend-EJV`
- Documentation: `prompts/prompts-EJV.md` with all prompts and results
