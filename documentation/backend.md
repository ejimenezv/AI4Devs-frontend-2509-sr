# Backend API Documentation

## Overview

The backend is built with Express.js and TypeScript, following clean architecture principles. It uses Prisma ORM for database operations with PostgreSQL.

## Project Structure

```
backend/
├── src/
│   ├── index.ts                    # Express app entry & middleware
│   ├── domain/models/              # Business entities
│   │   ├── Candidate.ts
│   │   ├── Position.ts
│   │   ├── Application.ts
│   │   ├── Interview.ts
│   │   ├── InterviewFlow.ts
│   │   ├── InterviewStep.ts
│   │   ├── InterviewType.ts
│   │   ├── Company.ts
│   │   ├── Employee.ts
│   │   ├── Education.ts
│   │   ├── WorkExperience.ts
│   │   └── Resume.ts
│   ├── application/services/       # Business logic
│   │   ├── candidateService.ts
│   │   ├── positionService.ts
│   │   ├── fileUploadService.ts
│   │   └── validator.ts
│   ├── presentation/controllers/   # Request handlers
│   │   ├── candidateController.ts
│   │   └── positionController.ts
│   └── routes/                     # API routes
│       ├── candidateRoutes.ts
│       └── positionRoutes.ts
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── migrations/                # DB migrations
│   └── seed.ts                   # Seeding script
└── api-spec.yaml                  # OpenAPI specification
```

## API Endpoints

### Candidates

#### POST /candidates
Create a new candidate with education, work experience, and resume.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "123456789",
  "address": "123 Main St",
  "educations": [
    {
      "institution": "MIT",
      "title": "Computer Science",
      "startDate": "2018-09-01",
      "endDate": "2022-06-01"
    }
  ],
  "workExperiences": [
    {
      "company": "Tech Corp",
      "position": "Developer",
      "description": "Full-stack development",
      "startDate": "2022-07-01",
      "endDate": "2024-01-01"
    }
  ],
  "cv": {
    "filePath": "/uploads/resume.pdf",
    "fileType": "application/pdf"
  }
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  ...
}
```

#### GET /candidates/:id
Get candidate details by ID.

**Response:** `200 OK`
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "123456789",
  "address": "123 Main St",
  "educations": [...],
  "workExperiences": [...],
  "resumes": [...],
  "applications": [...]
}
```

#### PUT /candidates/:id
Update candidate's interview stage.

**Request Body:**
```json
{
  "applicationId": 1,
  "currentInterviewStep": 2
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "positionId": 1,
  "candidateId": 1,
  "currentInterviewStep": 2,
  ...
}
```

### Positions

#### GET /position/:id/interviewflow
Get the interview flow for a position.

**Response:** `200 OK`
```json
{
  "positionName": "Senior Developer",
  "interviewFlow": {
    "id": 1,
    "description": "Standard technical interview",
    "interviewSteps": [
      {
        "id": 1,
        "name": "Phone Screen",
        "orderIndex": 1,
        "interviewType": {
          "id": 1,
          "name": "Phone Interview",
          "description": "Initial screening call"
        }
      },
      {
        "id": 2,
        "name": "Technical Interview",
        "orderIndex": 2,
        "interviewType": {...}
      }
    ]
  }
}
```

#### GET /position/:id/candidates
Get all candidates for a position with their current interview stage.

**Response:** `200 OK`
```json
[
  {
    "fullName": "John Doe",
    "currentInterviewStep": 2,
    "averageScore": 4.5,
    "candidateId": 1,
    "applicationId": 1
  },
  {
    "fullName": "Jane Smith",
    "currentInterviewStep": 1,
    "averageScore": null,
    "candidateId": 2,
    "applicationId": 2
  }
]
```

### File Upload

#### POST /upload
Upload a CV/resume file.

**Request:** `multipart/form-data`
- Field name: `file`
- Accepted types: PDF, DOCX

**Response:** `200 OK`
```json
{
  "filePath": "/uploads/1702123456789-resume.pdf",
  "fileType": "application/pdf"
}
```

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────────┐
│  Candidate  │───────│ Application │───────│    Position     │
│             │  1:N  │             │  N:1  │                 │
└─────────────┘       └─────────────┘       └─────────────────┘
      │                     │                       │
      │ 1:N                 │ N:1                   │ N:1
      ▼                     ▼                       ▼
┌─────────────┐       ┌─────────────┐       ┌─────────────────┐
│  Education  │       │  Interview  │       │  InterviewFlow  │
└─────────────┘       └─────────────┘       └─────────────────┘
      │                     │                       │
┌─────────────┐             │ N:1                   │ 1:N
│WorkExperience│            ▼                       ▼
└─────────────┘       ┌─────────────┐       ┌─────────────────┐
      │               │InterviewStep│───────│  InterviewStep  │
┌─────────────┐       └─────────────┘  N:1  └─────────────────┘
│   Resume    │             │
└─────────────┘             │ N:1
                            ▼
                      ┌─────────────┐
                      │InterviewType│
                      └─────────────┘
```

### Key Models

#### Candidate
```prisma
model Candidate {
  id              Int               @id @default(autoincrement())
  firstName       String
  lastName        String
  email           String            @unique
  phone           String?
  address         String?
  educations      Education[]
  workExperiences WorkExperience[]
  resumes         Resume[]
  applications    Application[]
}
```

#### Position
```prisma
model Position {
  id                  Int           @id @default(autoincrement())
  companyId           Int
  interviewFlowId     Int
  title               String
  description         String?
  status              String        // 'Open', 'Closed', 'Draft'
  isVisible           Boolean       @default(false)
  location            String?
  jobDescription      String?
  requirements        String?
  responsibilities    String?
  salaryMin           Decimal?
  salaryMax           Decimal?
  employmentType      String?
  benefits            String?
  applicationDeadline DateTime?
  contactInfo         String?
  company             Company       @relation(...)
  interviewFlow       InterviewFlow @relation(...)
  applications        Application[]
}
```

#### Application
```prisma
model Application {
  id                   Int            @id @default(autoincrement())
  positionId           Int
  candidateId          Int
  applicationDate      DateTime       @default(now())
  currentInterviewStep Int            @default(1)
  notes                String?
  position             Position       @relation(...)
  candidate            Candidate      @relation(...)
  interviewStep        InterviewStep? @relation(...)
  interviews           Interview[]
}
```

#### InterviewFlow & InterviewStep
```prisma
model InterviewFlow {
  id             Int             @id @default(autoincrement())
  description    String?
  interviewSteps InterviewStep[]
  positions      Position[]
}

model InterviewStep {
  id              Int           @id @default(autoincrement())
  interviewFlowId Int
  interviewTypeId Int
  name            String
  orderIndex      Int
  interviewFlow   InterviewFlow @relation(...)
  interviewType   InterviewType @relation(...)
  applications    Application[]
  interviews      Interview[]
}
```

## Services

### candidateService.ts
- `addCandidate(candidateData)`: Creates candidate with nested relations
- `findCandidateById(id)`: Retrieves candidate with all related data
- `updateCandidateStage(id, applicationId, step)`: Updates interview stage

### positionService.ts
- `getInterviewFlowByPositionService(positionId)`: Returns position's interview pipeline
- `getCandidatesByPositionService(positionId)`: Returns all candidates for a position

### validator.ts
Input validation rules:
- `validateName(name)`: Letters and spaces, 2-100 chars
- `validateEmail(email)`: Standard email format
- `validatePhone(phone)`: 9-15 digits
- `validateDate(date)`: YYYY-MM-DD format
- `validateAddress(address)`: 10-200 chars

## Error Handling

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

## Running the Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm start
```

Server runs at `http://localhost:3010`
