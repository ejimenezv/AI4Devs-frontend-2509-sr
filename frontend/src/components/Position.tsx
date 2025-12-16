import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import CandidateCard from './CandidateCard';
import './Position.css';
import {
  InterviewStep,
  Candidate,
  getPositionInterviewFlow,
  getPositionCandidates,
  updateCandidateStage
} from '../services/positionService';

// Mock data for initial development
const MOCK_POSITION_NAME = 'Senior Full-Stack Engineer';
const MOCK_INTERVIEW_STEPS: InterviewStep[] = [
  { id: 1, name: 'Initial Screening', orderIndex: 1, interviewFlowId: 1, interviewTypeId: 1 },
  { id: 2, name: 'Technical Interview', orderIndex: 2, interviewFlowId: 1, interviewTypeId: 2 },
  { id: 3, name: 'Manager Interview', orderIndex: 3, interviewFlowId: 1, interviewTypeId: 3 },
];
const MOCK_CANDIDATES: Candidate[] = [
  { id: 1, fullName: 'John Doe', currentInterviewStep: 'Technical Interview', averageScore: 5, applicationId: 1 },
  { id: 2, fullName: 'Jane Smith', currentInterviewStep: 'Technical Interview', averageScore: 4, applicationId: 3 },
  { id: 3, fullName: 'Carlos García', currentInterviewStep: 'Initial Screening', averageScore: null, applicationId: 4 },
];

// Set to true to use mock data instead of API
const USE_MOCK_DATA = false;

const Position: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [positionName, setPositionName] = useState<string>('');
  const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (USE_MOCK_DATA) {
        // Use mock data
        setPositionName(MOCK_POSITION_NAME);
        setInterviewSteps(MOCK_INTERVIEW_STEPS);
        setCandidates(MOCK_CANDIDATES);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const positionId = parseInt(id || '1', 10);

        // Fetch data in parallel
        const [flowResponse, candidatesResponse] = await Promise.all([
          getPositionInterviewFlow(positionId),
          getPositionCandidates(positionId)
        ]);

        setPositionName(flowResponse.positionName);
        setInterviewSteps(
          flowResponse.interviewFlow.interviewSteps.sort((a, b) => a.orderIndex - b.orderIndex)
        );
        setCandidates(candidatesResponse);
      } catch (err) {
        console.error('Error fetching position data:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar los datos');
        // Fallback to mock data on error
        setPositionName(MOCK_POSITION_NAME);
        setInterviewSteps(MOCK_INTERVIEW_STEPS);
        setCandidates(MOCK_CANDIDATES);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Group candidates by interview step name
  const getCandidatesByStep = (stepName: string): Candidate[] => {
    return candidates.filter(candidate => candidate.currentInterviewStep === stepName);
  };

  // Handle drag start - set the active candidate for the drag overlay
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const candidateData = active.data.current?.candidate as Candidate | undefined;
    if (candidateData) {
      setActiveCandidate(candidateData);
    }
  };

  // Handle drag end - update candidate's interview step
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCandidate(null);

    if (!over) return;

    // Extract IDs
    const candidateIdStr = active.id.toString().replace('candidate-', '');
    const columnIdStr = over.id.toString().replace('column-', '');

    const candidateId = parseInt(candidateIdStr, 10);
    const newStepId = parseInt(columnIdStr, 10);

    // Find the candidate being dragged
    const draggedCandidate = candidates.find(c => c.id === candidateId);
    if (!draggedCandidate) return;

    // Find the new step
    const newStep = interviewSteps.find(s => s.id === newStepId);
    if (!newStep) return;

    // Check if the candidate is already in this step
    if (draggedCandidate.currentInterviewStep === newStep.name) return;

    // Optimistic UI update
    const previousCandidates = [...candidates];
    setCandidates(prevCandidates =>
      prevCandidates.map(c =>
        c.id === candidateId
          ? { ...c, currentInterviewStep: newStep.name }
          : c
      )
    );

    try {
      // Call API to update candidate stage
      await updateCandidateStage(candidateId, draggedCandidate.applicationId, newStepId);
    } catch (err) {
      // Revert on error
      console.error('Error updating candidate stage:', err);
      setCandidates(previousCandidates);
      setError('Error al mover el candidato. Por favor intente de nuevo.');
      // Clear error after 3 seconds
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="kanban-loading">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4 px-4">
      {/* Header with back navigation and title */}
      <div className="position-header">
        <Link to="/positions" className="back-button">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="position-title">{positionName}</h2>
      </div>

      {/* Error alert */}
      {error && (
        <Alert variant="danger" className="kanban-error" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Kanban board with DnD context */}
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          {interviewSteps.map((step) => (
            <KanbanColumn
              key={step.id}
              step={step}
              candidates={getCandidatesByStep(step.name)}
            />
          ))}
        </div>

        {/* Drag overlay - shows card preview while dragging */}
        <DragOverlay>
          {activeCandidate ? (
            <CandidateCard candidate={activeCandidate} isDragOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Container>
  );
};

export default Position;
