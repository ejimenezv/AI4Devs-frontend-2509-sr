# Prompt 3: Test Backend Endpoints

## Instructions for Claude Code

Before implementing the frontend, verify that the backend API endpoints are working correctly. The backend team has already implemented these endpoints - we just need to consume them.

### Context:
- Backend server runs on `http://localhost:3010`
- The activity.md specifies three endpoints we need to consume
- We need to understand the exact response format for frontend integration
- This is a **frontend-focused activity** - we are NOT creating backend endpoints

### Endpoints to test:

1. **GET /positions/:id/interviewFlow**
   ```json
   Expected response:
   {
     "positionName": "Senior backend engineer",
     "interviewFlow": {
       "id": 1,
       "description": "Standard development interview process",
       "interviewSteps": [
         { "id": 1, "name": "Initial Screening", "orderIndex": 1 },
         { "id": 2, "name": "Technical Interview", "orderIndex": 2 },
         { "id": 3, "name": "Manager Interview", "orderIndex": 2 }
       ]
     }
   }
   ```

2. **GET /positions/:id/candidates**
   ```json
   Expected response:
   [
     { "fullName": "Jane Smith", "currentInterviewStep": "Technical Interview", "averageScore": 4 },
     { "fullName": "Carlos Garcia", "currentInterviewStep": "Initial Screening", "averageScore": 0 },
     { "fullName": "John Doe", "currentInterviewStep": "Manager Interview", "averageScore": 5 }
   ]
   ```

3. **PUT /candidates/:id/stage**
   ```json
   Request body: { "applicationId": "1", "currentInterviewStep": "3" }
   Expected response: { "message": "Candidate stage updated successfully", "data": {...} }
   ```

### Tasks:

1. **Check if backend server is running**:
   ```bash
   curl http://localhost:3010/ 2>/dev/null || echo "Backend not running"
   ```

2. **If not running, start the backend**:
   ```bash
   cd backend && npm install && npm run dev
   ```

3. **Test each endpoint** using curl or similar:
   ```bash
   # Test interview flow endpoint
   curl -s http://localhost:3010/positions/1/interviewFlow | head -100

   # Test candidates endpoint
   curl -s http://localhost:3010/positions/1/candidates | head -100
   ```

4. **Document findings**:
   - Actual response format (may differ from activity.md examples)
   - Any missing fields or different field names
   - HTTP status codes returned

### Important Notes:
- If backend is unavailable, we'll implement mock data fallback in the service
- Note the exact field names (camelCase vs snake_case) for TypeScript interfaces
- Check if candidate ID is included in the response (needed for drag-drop updates)

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 3" section with:
- Backend status (running or not)
- Actual API responses or error messages
- Any differences from expected format
- Mark checkbox as completed
