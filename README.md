# LifeOS

> A personal operating system for managing tasks, time, goals, habits, projects, and finances in one place.

LifeOS is a full-stack personal productivity platform designed to bring together the different areas of everyday planning into a single system.

The project is being built with a modular architecture, with the long-term goal of developing an intelligent planning engine capable of analyzing a user's tasks, calendar, goals, habits, available time, deadlines, and preferences to generate personalized daily plans.

---

## Overview

Most productivity tools focus on a single area: tasks, calendars, habits, finances, or goals.

LifeOS aims to connect these areas instead of treating them as isolated systems.

The platform is designed around the idea that a person's available time, priorities, commitments, goals, and habits should be considered together when deciding what to do next.

### Main areas

* Tasks
* Calendar & events
* Habits
* Goals
* Projects
* Personal finances
* Time availability
* Personalized planning
* Analytics

---

## Architecture

LifeOS follows a layered full-stack architecture:

```text
Frontend
   ↓
Hooks
   ↓
Services
   ↓
API Client
   ↓
REST API
   ↓
Backend Services
   ↓
PostgreSQL
```

The system is designed as a modular monolith rather than a collection of microservices.

### Planned intelligent layer

```text
LifeOS Backend
       ↓
Structured user data
       ↓
Planning Engine
       ↓
Prioritization & scheduling
       ↓
AI recommendations
       ↓
Validated daily plan
```

The intelligent layer will be introduced progressively, starting with deterministic planning logic before incorporating AI-based recommendations.

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Recharts
* PWA

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* REST API
* OpenAPI

### Database & Infrastructure

* PostgreSQL
* Redis
* Docker
* Docker Compose

### Future intelligent services

* Python
* FastAPI
* LLM API
* Planning algorithms

### DevOps

* GitHub Actions
* Docker
* AWS
* CI/CD

---

## Project Structure

```text
LifeOS/
│
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── lib/
│
├── backend/
│   └── src/
│       └── main/
│           └── java/
│               └── com/
│                   └── lifeos/
│                       ├── auth/
│                       ├── users/
│                       ├── tasks/
│                       ├── events/
│                       ├── habits/
│                       ├── goals/
│                       ├── finance/
│                       ├── projects/
│                       ├── planning/
│                       ├── analytics/
│                       └── shared/
│
├── docs/
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Current Features

The project is currently under active development.

### Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Password hashing
* Authenticated API requests

### Tasks

* Create tasks
* View tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Task priorities
* Task status
* Estimated duration
* Due dates
* Task filtering

The frontend follows:

```text
Page
 ↓
Hook
 ↓
Service
 ↓
apiFetch()
 ↓
Spring Boot API
```

This separation keeps UI components independent from direct API communication.

---

## Planning Engine

One of the main goals of LifeOS is to develop a planning engine capable of prioritizing activities based on multiple factors.

The initial deterministic prioritization model is:

```text
score =
    urgency × 0.35
  + importance × 0.30
  + deadline × 0.20
  + effort × 0.15
```

The engine is intended to eventually consider:

* Task urgency
* Task importance
* Deadlines
* Estimated duration
* Calendar events
* Available time
* Goals
* Habits
* User preferences
* Existing commitments

The output will be a structured daily plan rather than simply a list of recommendations.

---

## Running Locally

### Requirements

Make sure you have installed:

* Node.js
* npm
* Java 21
* Maven
* Docker Desktop
* Git

---

### 1. Clone the repository

```bash
git clone <repository-url>
cd LifeOS
```

---

### 2. Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

PostgreSQL will run on:

```text
localhost:5432
```

Database configuration:

```text
Database: lifeos
User: lifeos
Password: lifeos_dev
```

---

### 3. Start the backend

```bash
cd backend
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

The API will run on:

```text
http://localhost:8080
```

Health check:

```text
GET /api/health
```

---

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Environment Variables

### Frontend

Create:

```text
frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Backend

The backend supports environment variables for JWT configuration:

```env
JWT_SECRET=your-secure-secret
JWT_EXPIRATION=86400000
```

For production environments, secrets should be provided through the deployment environment rather than committed to the repository.

---

## API

The backend exposes REST endpoints organized by domain.

Current examples:

```text
GET    /api/health

POST   /api/auth/register
POST   /api/auth/login

GET    /api/users/me

GET    /api/tasks
GET    /api/tasks/{id}
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
```

Protected endpoints require:

```text
Authorization: Bearer <JWT>
```

---

## Development Principles

LifeOS follows several architectural principles:

### Separation of concerns

Frontend pages should not communicate directly with the backend.

```text
Component
   ↓
Hook
   ↓
Service
   ↓
API Client
```

### Domain-oriented backend

Backend functionality is organized by business domain rather than by technical layer alone.

```text
tasks/
events/
habits/
goals/
finance/
projects/
planning/
```

### Security

* JWT-based authentication
* BCrypt password hashing
* Stateless API sessions
* Protected endpoints
* User-owned resources

### Incremental intelligence

The planning system will initially rely on deterministic rules.

AI will be introduced later as an additional intelligence layer rather than making the core application dependent on an LLM.

---

## Roadmap

### Phase 1 — Core Platform

* [x] Project architecture
* [x] Authentication
* [x] User management
* [x] Task CRUD
* [x] Task completion
* [ ] Events
* [ ] Habits
* [ ] Goals
* [ ] Projects
* [ ] Expenses

### Phase 2 — Planning

* [ ] Time availability
* [ ] Task prioritization
* [ ] Scheduling algorithm
* [ ] Daily planning
* [ ] Conflict detection
* [ ] Planning analytics

### Phase 3 — Intelligence

* [ ] Python planning service
* [ ] AI recommendations
* [ ] Context-aware planning
* [ ] Natural-language interaction
* [ ] Plan validation
* [ ] Personalized planning

### Phase 4 — Production

* [ ] Redis
* [ ] Background jobs
* [ ] Notifications
* [ ] Docker production setup
* [ ] GitHub Actions
* [ ] AWS deployment
* [ ] Monitoring
* [ ] Production security hardening

---

## Project Goal

LifeOS is not intended to be just another task manager.

The long-term goal is to build a system that understands the relationship between **what a person wants to achieve, what they have committed to, how much time they have, and what they should prioritize next**.

The project is also being developed as a practical full-stack engineering portfolio project, covering software architecture, backend development, frontend development, databases, authentication, DevOps, cloud deployment, and applied intelligent systems.

---

## Status

**In active development.**

The architecture and core authentication/task functionality are currently being implemented, with additional productivity modules and the intelligent planning engine planned for subsequent phases.
