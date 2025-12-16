# LTI - Talent Tracking System Architecture

## Overview

LTI (Talent Tracking System) is a full-stack recruitment management application designed to help HR teams manage job positions, track candidates, and coordinate interview processes.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.3.1 |
| | React Router | 6.23.1 |
| | React-Bootstrap | 2.10.2 |
| | Bootstrap | 5.3.3 |
| | TypeScript | 4.9.5 |
| **Backend** | Express | 4.19.2 |
| | TypeScript | 4.9.5 |
| | Prisma ORM | 5.13.0 |
| **Database** | PostgreSQL | (via Docker) |
| **Infrastructure** | Docker Compose | - |

## Project Structure

```
AI4Devs-frontend-2509-sr/
├── backend/                    # Express/TypeScript backend server
│   ├── src/
│   │   ├── index.ts           # Express app entry point
│   │   ├── domain/models/     # Business entities (Candidate, Position, etc.)
│   │   ├── application/services/ # Business logic layer
│   │   ├── presentation/controllers/ # Request handlers
│   │   └── routes/            # API route definitions
│   └── prisma/
│       ├── schema.prisma      # Database schema
│       ├── migrations/        # Database migrations
│       └── seed.ts           # Seeding script
├── frontend/                   # React/TypeScript frontend app
│   ├── src/
│   │   ├── App.tsx           # Root component
│   │   ├── components/       # React components
│   │   └── services/         # API client services
│   └── public/               # Static assets
├── documentation/             # Project documentation
├── docker-compose.yml         # PostgreSQL container config
└── package.json              # Root monorepo config
```

## Architecture Pattern

### Backend: Clean Architecture (3-tier)

```
┌─────────────────────────────────────────────────────────────┐
│                      Routes Layer                            │
│    candidateRoutes.ts, positionRoutes.ts                    │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                  Presentation Layer                          │
│    Controllers (candidateController, positionController)     │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   Application Layer                          │
│    Services (candidateService, positionService)              │
│    Validators (validator.ts)                                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                     Domain Layer                             │
│    Models (Candidate, Position, Application, Interview...)   │
│    Business Rules & Entity Logic                             │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                     Database Layer                           │
│    Prisma ORM + PostgreSQL                                   │
└─────────────────────────────────────────────────────────────┘
```

### Frontend: Component-Based Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                               │
│                    (React Router)                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      Components                              │
│    RecruiterDashboard, Positions, AddCandidateForm          │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      Services                                │
│    candidateService.js (API calls)                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Backend API                               │
│                 http://localhost:3010                        │
└─────────────────────────────────────────────────────────────┘
```

## Configuration

### Server Ports

| Service | Port |
|---------|------|
| Frontend (React) | 3000 |
| Backend (Express) | 3010 |
| PostgreSQL | 5432 |

### Environment Variables

**Root `.env`:**
```
DATABASE_URL="postgresql://user:password@localhost:5432/LTIdb"
```

**Backend `.env`:**
```
DATABASE_URL="postgresql://LTIdbUser:password@localhost:5432/LTIdb?schema=public"
```

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (frontend development server)

## Data Flow

### Candidate Creation Flow

```
1. User fills AddCandidateForm
2. Frontend uploads CV → POST /upload
3. Frontend submits candidate data → POST /candidates
4. Backend validates input (validator.ts)
5. Backend creates records via Prisma (candidateService)
6. Database stores candidate + education + experience + resume
7. Response returned to frontend
```

### Position/Candidate View Flow

```
1. User navigates to /positions
2. Frontend displays position list (currently mock data)
3. User clicks "Ver proceso" on a position
4. Frontend calls GET /position/:id/interviewflow
5. Frontend calls GET /position/:id/candidates
6. Backend queries Prisma for data
7. Response returned and displayed in kanban view
```

### Interview Stage Update Flow

```
1. User drags candidate card in kanban
2. Frontend calls PUT /candidates/:id
3. Request body: { applicationId, currentInterviewStep }
4. Backend updates Application.currentInterviewStep
5. Response confirms update
```

## Key Design Decisions

1. **Prisma ORM**: Provides type-safe database access and automatic migrations
2. **React-Bootstrap**: Consistent UI components with Bootstrap styling
3. **Clean Architecture**: Separation of concerns for testability and maintainability
4. **TypeScript**: Type safety across frontend and backend
5. **Docker**: Containerized PostgreSQL for consistent development environment
