# Backend Setup Instructions

## Prerequisites
- Docker Desktop must be running
- Node.js installed

## Steps to Start the Backend

### 1. Start the Database (PostgreSQL via Docker)
```bash
docker-compose up -d
```

### 2. Install Backend Dependencies (if not already installed)
```bash
cd backend
npm install
```

### 3. Run Database Migrations
```bash
cd backend
npx prisma migrate deploy
```

### 4. Seed the Database with Sample Data
```bash
cd backend
npx ts-node-dev --transpile-only prisma/seed.ts
```

### 5. Start the Backend Server
```bash
cd backend
npm run dev
```

The server will be running at: http://localhost:3010

## Stopping the Services

### Stop the Backend Server
Press `Ctrl+C` in the terminal running `npm run dev`

### Stop the Database
```bash
docker-compose down
```

## Quick Start (All Commands)
```bash
# From project root directory
docker-compose up -d
cd backend
npm install
npx prisma migrate deploy
npx ts-node-dev --transpile-only prisma/seed.ts
npm run dev
```

## API Endpoints Available
- `GET /position/:id/interviewflow` - Get interview flow for a position
- `GET /position/:id/candidates` - Get candidates for a position
- `PUT /candidates/:id` - Update candidate stage (body: `{ "applicationId": "1", "currentInterviewStep": "3" }`)
