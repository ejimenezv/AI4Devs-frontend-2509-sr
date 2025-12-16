import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidateCard from '../CandidateCard';
import { Candidate } from '../../services/positionService';

// Mock @dnd-kit/core
jest.mock('@dnd-kit/core', () => ({
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

describe('CandidateCard Component', () => {
  const createCandidate = (overrides: Partial<Candidate> = {}): Candidate => ({
    id: 1,
    fullName: 'John Doe',
    currentInterviewStep: 'Technical Interview',
    averageScore: 4.5,
    applicationId: 1,
    ...overrides,
  });

  it('displays candidate name', () => {
    const candidate = createCandidate({ fullName: 'Alice Johnson' });
    render(<CandidateCard candidate={candidate} />);

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
  });

  it('displays candidate score', () => {
    const candidate = createCandidate({ averageScore: 4.5 });
    render(<CandidateCard candidate={candidate} />);

    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('displays N/A when score is null', () => {
    const candidate = createCandidate({ averageScore: null });
    render(<CandidateCard candidate={candidate} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('displays N/A when score is 0', () => {
    const candidate = createCandidate({ averageScore: 0 });
    render(<CandidateCard candidate={candidate} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('applies score-high class for scores >= 4', () => {
    const candidate = createCandidate({ averageScore: 4.5 });
    render(<CandidateCard candidate={candidate} />);

    const scoreElement = screen.getByText('4.5');
    expect(scoreElement).toHaveClass('score-high');
  });

  it('applies score-medium class for scores >= 2 and < 4', () => {
    const candidate = createCandidate({ averageScore: 3.0 });
    render(<CandidateCard candidate={candidate} />);

    const scoreElement = screen.getByText('3.0');
    expect(scoreElement).toHaveClass('score-medium');
  });

  it('applies score-low class for scores > 0 and < 2', () => {
    const candidate = createCandidate({ averageScore: 1.5 });
    render(<CandidateCard candidate={candidate} />);

    const scoreElement = screen.getByText('1.5');
    expect(scoreElement).toHaveClass('score-low');
  });

  it('applies score-none class for null scores', () => {
    const candidate = createCandidate({ averageScore: null });
    render(<CandidateCard candidate={candidate} />);

    const scoreElement = screen.getByText('N/A');
    expect(scoreElement).toHaveClass('score-none');
  });

  it('renders as drag overlay when isDragOverlay is true', () => {
    const candidate = createCandidate();
    const { container } = render(<CandidateCard candidate={candidate} isDragOverlay />);

    const card = container.querySelector('.candidate-card');
    expect(card).toHaveClass('drag-overlay');
  });
});
