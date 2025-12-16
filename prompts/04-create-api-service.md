# Prompt 4: Create Frontend API Service

## Instructions for Claude Code

Create a TypeScript service file in the **frontend** to consume the existing backend API endpoints. The backend endpoints already exist - we are building the frontend client to call them.

### Context:
- Reference `documentation/backend.md` for API endpoint details
- Reference `documentation/frontend.md` for existing service patterns (see candidateService.js)
- Reference Prompt 3 results for actual API response formats
- Base API URL: `http://localhost:3010`

### Existing Backend Endpoints to consume:

1. **GET /positions/:id/interviewFlow**
   - Returns position name and interview steps
   - Response: { positionName, interviewFlow: { interviewSteps[] } }

2. **GET /positions/:id/candidates**
   - Returns all candidates for a position
   - Response: [{ fullName, currentInterviewStep, averageScore }]

3. **PUT /candidates/:id/stage**
   - Updates candidate's interview stage
   - Body: { applicationId, currentInterviewStep }

### Tasks:

1. **Create** `frontend/src/services/positionService.ts`

2. **Define TypeScript interfaces** based on actual API responses:
   ```typescript
   interface InterviewStep {
     id: number;
     name: string;
     orderIndex: number;
     interviewFlowId: number;
     interviewTypeId: number;
   }

   interface Candidate {
     fullName: string;
     currentInterviewStep: string;
     averageScore: number;
     // Add applicationId if returned by API
   }
   ```

3. **Implement service functions**:
   - `getPositionInterviewFlow(positionId: number): Promise<PositionFlowResponse>`
   - `getPositionCandidates(positionId: number): Promise<Candidate[]>`
   - `updateCandidateStage(applicationId: number, newStepId: number): Promise<UpdateResponse>`

4. **Add error handling** with try-catch blocks

5. **Include mock data fallback** for development when backend is unavailable

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 4" section with:
- Summary of created interfaces and functions
- Note if mock data fallback was included
- Mark checkbox as completed

### Expected Output:
- `frontend/src/services/positionService.ts`
