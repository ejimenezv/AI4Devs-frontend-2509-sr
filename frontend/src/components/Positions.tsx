import React from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Position = {
    id: number;
    title: string;
    manager: string;
    deadline: string;
    status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
};

// Mock positions matching backend seed data (position IDs 1 and 2)
const mockPositions: Position[] = [
    { id: 1, title: 'Senior Full-Stack Engineer', manager: 'Alice Johnson', deadline: '2024-12-31', status: 'Abierto' },
    { id: 2, title: 'Data Scientist', manager: 'Bob Miller', deadline: '2024-12-31', status: 'Abierto' }
];

const Positions: React.FC = () => {
    const navigate = useNavigate();

    const handleViewProcess = (positionId: number) => {
        navigate(`/position/${positionId}`);
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Posiciones</h2>
            <Row className="mb-4">
                <Col md={3}>
                    <Form.Control type="text" placeholder="Buscar por título" />
                </Col>
                <Col md={3}>
                    <Form.Control type="date" placeholder="Buscar por fecha" />
                </Col>
                <Col md={3}>
                    <Form.Control as="select">
                        <option value="">Estado</option>
                        <option value="open">Abierto</option>
                        <option value="filled">Contratado</option>
                        <option value="closed">Cerrado</option>
                        <option value="draft">Borrador</option>
                    </Form.Control>
                </Col>
                <Col md={3}>
                    <Form.Control as="select">
                        <option value="">Manager</option>
                        <option value="john_doe">John Doe</option>
                        <option value="jane_smith">Jane Smith</option>
                        <option value="alex_jones">Alex Jones</option>
                    </Form.Control>
                </Col>
            </Row>
            <Row>
                {mockPositions.map((position, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>{position.title}</Card.Title>
                                <Card.Text>
                                    <strong>Manager:</strong> {position.manager}<br />
                                    <strong>Deadline:</strong> {position.deadline}
                                </Card.Text>
                                <span className={`badge ${position.status === 'Abierto' ? 'bg-warning' : position.status === 'Contratado' ? 'bg-success' : position.status === 'Borrador' ? 'bg-secondary' : 'bg-warning'} text-white`}>
                                    {position.status}
                                </span>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button variant="primary" onClick={() => handleViewProcess(position.id)}>Ver proceso</Button>
                                    <Button variant="secondary">Editar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Positions;