# Prompt 7: Connect Components to API

## Instructions for Claude Code

Connect the kanban components to the backend API using the service created in Prompt 4.

### Context:
- Reference `documentation/backend.md` for API details
- Service functions from `positionService.ts`
- Components from Prompts 5 and 6

### Tasks:

1. **Update Position.tsx** to:
   - Get position ID from URL params using `useParams()`
   - Fetch interview flow on component mount
   - Fetch candidates on component mount
   - Handle loading state with spinner
   - Handle error state with alert
   - Implement optimistic UI updates on drag

2. **Implement state management**:
   ```typescript
   const [positionName, setPositionName] = useState<string>('');
   const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([]);
   const [candidates, setCandidates] = useState<Candidate[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   ```

3. **Connect drag-end to API**:
   - On successful drop, call `updateCandidateStage()`
   - Update local state optimistically
   - Revert on API error
   - Show toast/alert on error

4. **Add useEffect hooks**:
   ```typescript
   useEffect(() => {
     const fetchData = async () => {
       try {
         const flowData = await getPositionInterviewFlow(positionId);
         const candidatesData = await getPositionCandidates(positionId);
         // Update state
       } catch (err) {
         setError('Failed to load position data');
       }
     };
     fetchData();
   }, [positionId]);
   ```

### After completion:

Update the file `prompts/prompts-EJV.md` by replacing the "Prompt 6" section with:
- The actual prompt executed
- Description of API integration
- State management approach
- Mark checkbox as completed

### Expected Changes:
- `frontend/src/components/Position.tsx` (updated with API calls)
