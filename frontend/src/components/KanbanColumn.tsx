import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { InterviewStep, Candidate } from '../services/positionService';
import CandidateCard from './CandidateCard';
import './Position.css';

interface KanbanColumnProps {
  step: InterviewStep;
  candidates: Candidate[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ step, candidates }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${step.id}`,
    data: {
      step,
      type: 'column',
    },
  });

  return (
    <div className={`kanban-column ${isOver ? 'is-over' : ''}`}>
      <div className="kanban-column-header">
        <span className="column-title">{step.name}</span>
        <span className="column-count">{candidates.length}</span>
      </div>
      <div ref={setNodeRef} className="kanban-column-content">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
        {candidates.length === 0 && (
          <div className="kanban-column-empty">
            No hay candidatos
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
