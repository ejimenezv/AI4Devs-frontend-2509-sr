import React from 'react';
import { render, screen } from '@testing-library/react';
import KanbanColumn from '../KanbanColumn';
import { InterviewStep, Candidate } from '../../services/positionService';

// Mock @dnd-kit/core
jest.mock('@dnd-kit/core', () => ({
  useDroppable: () => ({
    setNodeRef: jest.fn(),
    isOver: false,
  }),
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    isDragging: false,
  }),
}));

// Mock @dnd-kit/utilities
jest.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Translate: {
      toString: () => null,
    },
  },
}));

describe('KanbanColumn Component', () => {
  const mockStep: InterviewStep = {
    id: 1,
    name: 'Technical Interview',
    orderIndex: 1,
    interviewFlowId: 1,
    interviewTypeId: 1,
  };

  const mockCandidates: Candidate[] = [
    { id: 1, fullName: 'John Doe', currentInterviewStep: 'Technical Interview', averageScore: 4.5, applicationId: 1 },
    { id: 2, fullName: 'Jane Smith', currentInterviewStep: 'Technical Interview', averageScore: 3.2, applicationId: 2 },
  ];

  it('renders column header with step name', () => {
    render(<KanbanColumn step={mockStep} candidates={[]} />);

    expect(screen.getByText('Technical Interview')).toBeInTheDocument();
  });

  it('renders column header with candidate count', () => {
    render(<KanbanColumn step={mockStep} candidates={mockCandidates} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders candidate cards', () => {
    render(<KanbanColumn step={mockStep} candidates={mockCandidates} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('shows empty state when no candidates', () => {
    render(<KanbanColumn step={mockStep} candidates={[]} />);

    expect(screen.getByText('No hay candidatos')).toBeInTheDocument();
  });

  it('renders correct number of candidate cards', () => {
    const { container } = render(<KanbanColumn step={mockStep} candidates={mockCandidates} />);

    const candidateCards = container.querySelectorAll('.candidate-card');
    expect(candidateCards).toHaveLength(2);
  });

  it('displays zero count when no candidates', () => {
    render(<KanbanColumn step={mockStep} candidates={[]} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
