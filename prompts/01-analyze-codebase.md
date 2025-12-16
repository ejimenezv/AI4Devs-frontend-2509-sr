# Prompt 1: Analyze and Document Codebase

## Instructions for Claude Code

Analyze the existing codebase structure and create comprehensive documentation. This documentation will serve as context for subsequent prompts.

### Tasks:

1. **Explore the project structure** - Identify all folders, key files, and their purposes
2. **Analyze the backend** - Document API endpoints, data models, services
3. **Analyze the frontend** - Document components, routing, services, styling patterns
4. **Create documentation files** in the `documentation/` folder:
   - `architecture.md` - Overall project architecture
   - `backend.md` - Backend API documentation
   - `frontend.md` - Frontend structure and patterns

### Requirements:

- Document the existing `/positions` page implementation
- Identify the API endpoints needed for the kanban view:
  - `GET /positions/:id/interviewFlow`
  - `GET /positions/:id/candidates`
  - `PUT /candidates/:id/stage`
- Note the styling approach (Bootstrap/React-Bootstrap)
- Identify patterns for creating new components

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 1" section with:
- The actual prompt executed
- A summary of the results
- Mark checkboxes as completed for created files

### Expected Output Files:
- `documentation/architecture.md`
- `documentation/backend.md`
- `documentation/frontend.md`
