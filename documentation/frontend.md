# Frontend Documentation

## Overview

The frontend is built with React 18 and TypeScript, using React-Bootstrap for UI components. It provides a recruitment management interface for HR professionals.

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx                    # Root component with routing
│   ├── index.tsx                  # React entry point
│   ├── components/
│   │   ├── Positions.tsx          # Positions list page
│   │   ├── AddCandidateForm.js    # Candidate creation form
│   │   ├── RecruiterDashboard.js  # Main dashboard
│   │   └── FileUploader.js        # File upload component
│   ├── services/
│   │   └── candidateService.js    # API client
│   ├── assets/
│   │   └── lti-logo.png           # Company logo
│   ├── index.css                  # Global styles
│   └── App.css                    # App component styles
└── public/
    └── index.html                 # HTML root
```

## Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.23.1",
  "bootstrap": "^5.3.3",
  "react-bootstrap": "^2.10.2",
  "react-bootstrap-icons": "^1.11.4",
  "react-datepicker": "^6.9.0",
  "typescript": "^4.9.5"
}
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | RecruiterDashboard | Main dashboard with navigation |
| `/positions` | Positions | List of job positions |
| `/add-candidate` | AddCandidateForm | New candidate form |

## Components

### Positions.tsx

The main positions listing page showing all job openings.

**Location:** `frontend/src/components/Positions.tsx`

**Features:**
- 3-column grid of position cards
- Search filters (title, deadline, status, manager)
- Status badges with color coding
- Action buttons: "Ver proceso" (View process), "Editar" (Edit)

**Status Colors:**
| Status | Spanish | Color |
|--------|---------|-------|
| Open | Abierto | Warning (yellow) |
| Hired | Contratado | Success (green) |
| Closed | Cerrado | Warning (yellow) |
| Draft | Borrador | Secondary (gray) |

**Current State:** Uses mock data (not connected to API)

```typescript
type Position = {
  title: string;
  manager: string;
  deadline: string;
  status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
};
```

### AddCandidateForm.js

Form for creating new candidates with education and work history.

**Location:** `frontend/src/components/AddCandidateForm.js`

**Features:**
- Two-column layout
- Dynamic education entries (add/remove)
- Dynamic work experience entries (add/remove)
- DatePicker for dates
- File upload for CV
- Form validation
- Success/error messages

**State Structure:**
```javascript
{
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  educations: [{ institution, title, startDate, endDate }],
  workExperiences: [{ company, position, description, startDate, endDate }],
  cv: { filePath: '', fileType: '' }
}
```

**API Integration:**
- POST `http://localhost:3010/candidates`

### RecruiterDashboard.js

Main dashboard with navigation to other pages.

**Location:** `frontend/src/components/RecruiterDashboard.js`

**Features:**
- LTI logo display
- Navigation cards:
  - "Añadir Candidato" → `/add-candidate`
  - "Ver Posiciones" → `/positions`

### FileUploader.js

Reusable file upload component.

**Location:** `frontend/src/components/FileUploader.js`

**Features:**
- File input with drag-and-drop support
- Upload button with loading spinner
- Accepted file types: PDF, DOCX
- Callbacks: `onChange`, `onUpload`

**API Integration:**
- POST `http://localhost:3010/upload` (multipart/form-data)

## Services

### candidateService.js

API client for candidate-related operations.

**Location:** `frontend/src/services/candidateService.js`

**Functions:**

```javascript
// Upload CV file
uploadCV(file) → { filePath, fileType }

// Create new candidate
sendCandidateData(candidateData) → candidate
```

## Styling Approach

### Bootstrap/React-Bootstrap

The project uses React-Bootstrap components with Bootstrap 5 styling.

**Import Pattern:**
```typescript
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
```

### Common Patterns

**Grid Layout:**
```typescript
<Container className="mt-5">
  <Row className="mb-4">
    <Col md={6}>Left Column</Col>
    <Col md={6}>Right Column</Col>
  </Row>
</Container>
```

**Cards:**
```typescript
<Card className="shadow-sm">
  <Card.Body>
    <Card.Title>Title</Card.Title>
    <Card.Text>Content</Card.Text>
  </Card.Body>
</Card>
```

**Forms:**
```typescript
<Form onSubmit={handleSubmit}>
  <Form.Group controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </Form.Group>
  <Button type="submit" variant="primary">Submit</Button>
</Form>
```

**Alerts:**
```typescript
{error && <Alert variant="danger">{error}</Alert>}
{success && <Alert variant="success">{success}</Alert>}
```

### Bootstrap Utility Classes

| Class | Purpose |
|-------|---------|
| `mt-5` | Margin top (large) |
| `mb-4` | Margin bottom |
| `shadow`, `shadow-sm` | Box shadows |
| `text-center` | Center text |
| `d-flex` | Flexbox container |
| `justify-content-between` | Space between items |
| `bg-success`, `bg-warning` | Background colors |

## Component Creation Patterns

### Functional Component with TypeScript

```typescript
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface Props {
  title: string;
  onAction: () => void;
}

const MyComponent: React.FC<Props> = ({ title, onAction }) => {
  const [state, setState] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return (
    <Container>
      <h2>{title}</h2>
      <input value={state} onChange={handleChange} />
    </Container>
  );
};

export default MyComponent;
```

### Dynamic List Management

```javascript
const [items, setItems] = useState([{ name: '' }]);

const handleAddItem = () => {
  setItems([...items, { name: '' }]);
};

const handleRemoveItem = (index) => {
  const updated = items.filter((_, i) => i !== index);
  setItems(updated);
};

const handleItemChange = (e, index) => {
  const updated = [...items];
  updated[index][e.target.name] = e.target.value;
  setItems(updated);
};
```

### Async Form Submission

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const response = await fetch('http://localhost:3010/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.status === 201) {
      setSuccess('Created successfully!');
    } else {
      throw new Error('Request failed');
    }
  } catch (err) {
    setError('Error: ' + err.message);
  }
};
```

## API Endpoints Used

| Endpoint | Method | Component | Purpose |
|----------|--------|-----------|---------|
| `/upload` | POST | FileUploader | Upload CV |
| `/candidates` | POST | AddCandidateForm | Create candidate |
| `/position/:id/interviewflow` | GET | (Kanban) | Get interview stages |
| `/position/:id/candidates` | GET | (Kanban) | Get position candidates |
| `/candidates/:id` | PUT | (Kanban) | Update candidate stage |

## Running the Frontend

```bash
cd frontend
npm install
npm start
```

Application runs at `http://localhost:3000`

## Future Kanban Implementation

The kanban view for managing candidates through interview stages will need:

1. **New Component:** `PositionKanban.tsx`
2. **Route:** `/positions/:id` or `/positions/:id/kanban`
3. **API Calls:**
   - `GET /position/:id/interviewflow` - Get columns
   - `GET /position/:id/candidates` - Get candidate cards
   - `PUT /candidates/:id` - Move candidate between columns
4. **Features:**
   - Drag-and-drop cards between columns
   - Each column represents an interview step
   - Cards show candidate name and average score
