import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Candidate } from '../services/positionService';
import './Position.css';

interface CandidateCardProps {
  candidate: Candidate;
  isDragOverlay?: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isDragOverlay = false }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `candidate-${candidate.id}`,
    data: {
      candidate,
      type: 'candidate',
    },
  });

  const getScoreClass = (score: number | null): string => {
    if (score === null || score === 0) return 'score-none';
    if (score >= 4) return 'score-high';
    if (score >= 2) return 'score-medium';
    return 'score-low';
  };

  const getScoreDisplay = (score: number | null): string => {
    if (score === null || score === 0) return 'N/A';
    return score.toFixed(1);
  };

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  const cardClassName = `candidate-card ${isDragging ? 'is-dragging' : ''} ${isDragOverlay ? 'drag-overlay' : ''}`;

  // For drag overlay, render without draggable hooks
  if (isDragOverlay) {
    return (
      <div className={cardClassName} style={style}>
        <div className="candidate-card-content">
          <span className="candidate-name">{candidate.fullName}</span>
          <span className={`candidate-score ${getScoreClass(candidate.averageScore)}`}>
            {getScoreDisplay(candidate.averageScore)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={cardClassName}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="candidate-card-content">
        <span className="candidate-name">{candidate.fullName}</span>
        <span className={`candidate-score ${getScoreClass(candidate.averageScore)}`}>
          {getScoreDisplay(candidate.averageScore)}
        </span>
      </div>
    </div>
  );
};

export default CandidateCard;
