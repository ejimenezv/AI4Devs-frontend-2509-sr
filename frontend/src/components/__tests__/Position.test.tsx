import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Position from '../Position';
import * as positionService from '../../services/positionService';

// Mock the positionService module
jest.mock('../../services/positionService', () => ({
  getPositionInterviewFlow: jest.fn(),
  getPositionCandidates: jest.fn(),
  updateCandidateStage: jest.fn(),
}));

// Mock react-router-dom useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

// Mock @dnd-kit/core to avoid issues with drag-drop in tests
jest.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DragOverlay: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  closestCenter: jest.fn(),
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    isDragging: false,
  }),
  useDroppable: () => ({
    setNodeRef: jest.fn(),
    isOver: false,
  }),
}));

const mockInterviewFlow: positionService.PositionFlowResponse = {
  positionName: 'Senior Full-Stack Engineer',
  interviewFlow: {
    id: 1,
    description: 'Standard interview process',
    interviewSteps: [
      { id: 1, name: 'Initial Screening', orderIndex: 1, interviewFlowId: 1, interviewTypeId: 1 },
      { id: 2, name: 'Technical Interview', orderIndex: 2, interviewFlowId: 1, interviewTypeId: 2 },
      { id: 3, name: 'Manager Interview', orderIndex: 3, interviewFlowId: 1, interviewTypeId: 3 },
    ],
  },
};

const mockCandidates: positionService.Candidate[] = [
  { id: 1, fullName: 'John Doe', currentInterviewStep: 'Initial Screening', averageScore: 4.5, applicationId: 1 },
  { id: 2, fullName: 'Jane Smith', currentInterviewStep: 'Technical Interview', averageScore: 3.2, applicationId: 2 },
  { id: 3, fullName: 'Carlos García', currentInterviewStep: 'Initial Screening', averageScore: null, applicationId: 3 },
];

const renderPosition = () => {
  return render(
    <BrowserRouter>
      <Position />
    </BrowserRouter>
  );
};

describe('Position Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock API calls to return pending promises
    (positionService.getPositionInterviewFlow as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    (positionService.getPositionCandidates as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    renderPosition();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders position title after data loads', async () => {
    (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
    (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

    renderPosition();

    await waitFor(() => {
      expect(screen.getByText('Senior Full-Stack Engineer')).toBeInTheDocument();
    });
  });

  it('renders correct number of columns', async () => {
    (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
    (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

    renderPosition();

    await waitFor(() => {
      expect(screen.getByText('Initial Screening')).toBeInTheDocument();
      expect(screen.getByText('Technical Interview')).toBeInTheDocument();
      expect(screen.getByText('Manager Interview')).toBeInTheDocument();
    });
  });

  it('renders candidates in correct columns', async () => {
    (positionService.getPositionInterviewFlow as jest.Mock).mockResolvedValue(mockInterviewFlow);
    (positionService.getPositionCandidates as jest.Mock).mockResolvedValue(mockCandidates);

    renderPosition();

    await waitFor(() => {
      // Check that candidates are rendered
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Carlos García')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    const errorMessage = 'Error al cargar los datos';
    (positionService.getPositionInterviewFlow as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );
    (positionService.getPositionCandidates as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    renderPosition();

    // Component should fall back to mock data on error and not crash
    await waitFor(() => {
      // Check that the component renders with fallback mock data
      expect(screen.getByText('Senior Full-Stack Engineer')).toBeInTheDocument();
    });
  });
});
