import axios from 'axios';

const API_BASE_URL = 'http://localhost:3010';

// ============================================================================
// TypeScript Interfaces based on actual API responses (from Prompt 3 testing)
// ============================================================================

export interface InterviewStep {
  id: number;
  name: string;
  orderIndex: number;
  interviewFlowId: number;
  interviewTypeId: number;
}

export interface InterviewFlow {
  id: number;
  description: string;
  interviewSteps: InterviewStep[];
}

export interface PositionFlowResponse {
  positionName: string;
  interviewFlow: InterviewFlow;
}

export interface Candidate {
  id: number;
  fullName: string;
  currentInterviewStep: string;
  averageScore: number | null;
  applicationId: number;
}

export interface UpdateStageResponse {
  message: string;
  data: {
    id: number;
    positionId: number;
    candidateId: number;
    applicationDate: string;
    currentInterviewStep: number;
    notes: string | null;
    interviews: unknown[];
  };
}

// ============================================================================
// Mock Data Fallback for development when backend is unavailable
// ============================================================================

const MOCK_INTERVIEW_FLOW: PositionFlowResponse = {
  positionName: 'Senior Full-Stack Engineer',
  interviewFlow: {
    id: 1,
    description: 'Standard development interview process',
    interviewSteps: [
      { id: 1, interviewFlowId: 1, interviewTypeId: 1, name: 'Initial Screening', orderIndex: 1 },
      { id: 2, interviewFlowId: 1, interviewTypeId: 2, name: 'Technical Interview', orderIndex: 2 },
      { id: 3, interviewFlowId: 1, interviewTypeId: 3, name: 'Manager Interview', orderIndex: 3 },
    ],
  },
};

const MOCK_CANDIDATES: Candidate[] = [
  { id: 1, fullName: 'John Doe', currentInterviewStep: 'Technical Interview', averageScore: 5, applicationId: 1 },
  { id: 2, fullName: 'Jane Smith', currentInterviewStep: 'Technical Interview', averageScore: 4, applicationId: 3 },
  { id: 3, fullName: 'Carlos García', currentInterviewStep: 'Initial Screening', averageScore: 0, applicationId: 4 },
];

// Flag to enable mock data fallback (can be controlled via environment variable)
const USE_MOCK_ON_ERROR = process.env.REACT_APP_USE_MOCK_DATA === 'true';

// ============================================================================
// Service Functions
// ============================================================================

/**
 * Get the interview flow for a position including position name and interview steps
 * @param positionId - The ID of the position
 * @returns Promise with position name and interview flow data
 */
export const getPositionInterviewFlow = async (positionId: number): Promise<PositionFlowResponse> => {
  try {
    // Note: Actual API route is /position/:id/interviewflow (singular, lowercase)
    const response = await axios.get<{ interviewFlow: PositionFlowResponse }>(
      `${API_BASE_URL}/position/${positionId}/interviewflow`
    );
    // API returns nested structure: { interviewFlow: { positionName, interviewFlow: {...} } }
    return response.data.interviewFlow;
  } catch (error) {
    console.error('Error fetching position interview flow:', error);
    if (USE_MOCK_ON_ERROR) {
      console.warn('Using mock data for interview flow');
      return MOCK_INTERVIEW_FLOW;
    }
    throw new Error(
      `Error al obtener el flujo de entrevistas: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

/**
 * Get all candidates for a specific position
 * @param positionId - The ID of the position
 * @returns Promise with array of candidates
 */
export const getPositionCandidates = async (positionId: number): Promise<Candidate[]> => {
  try {
    // Note: Actual API route is /position/:id/candidates (singular)
    const response = await axios.get<Candidate[]>(
      `${API_BASE_URL}/position/${positionId}/candidates`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching position candidates:', error);
    if (USE_MOCK_ON_ERROR) {
      console.warn('Using mock data for candidates');
      return MOCK_CANDIDATES;
    }
    throw new Error(
      `Error al obtener los candidatos: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

/**
 * Update a candidate's interview stage
 * @param candidateId - The ID of the candidate
 * @param applicationId - The ID of the application
 * @param newStepId - The ID of the new interview step
 * @returns Promise with update response
 */
export const updateCandidateStage = async (
  candidateId: number,
  applicationId: number,
  newStepId: number
): Promise<UpdateStageResponse> => {
  try {
    // Note: Actual API route is PUT /candidates/:id (without /stage suffix)
    const response = await axios.put<UpdateStageResponse>(
      `${API_BASE_URL}/candidates/${candidateId}`,
      {
        applicationId: applicationId.toString(),
        currentInterviewStep: newStepId.toString(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating candidate stage:', error);
    throw new Error(
      `Error al actualizar la etapa del candidato: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
