# Daily Fuel Tracker

A full-stack nutrition, exercise, and hydration tracking application built with React, Node.js, Express.js, and Microsoft SQL Server.

The system is designed around date-based tracking, authenticated user flows, and modular frontend-backend separation. It supports meal logging, exercise logging, water tracking, and dashboard-driven interaction through a structured full-stack architecture.

---

## Live Demo

The application is live and accessible at:

👉 https://69e64d7ec7f37912511ada8b--calm-strudel-62bb98.netlify.app/

---

## Project Structure

```text
daily-fuel-tracker/
├── client/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── services/
│       ├── routes/
│       └── assets/
│
├── server/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── middleware/
│       ├── config/
│       └── utils/
│
│   ├── database/
│   │   └── schema/
│   │
│   └── scripts/
│
├── docs/
│   ├── screenshots/
│   ├── database-schema.md
│   └── user-flow.md
```

---

## System Overview

| Layer | Responsibility |
|---|---|
| Frontend (React) | UI rendering, state management, and user interaction |
| Backend (Node.js + Express) | API layer, authentication, and business logic |
| Database (MSSQL) | Persistent storage for user and activity data |

The system is designed with a clear separation between frontend and backend, enabling modular development, scalability, and maintainability.

---

## Engineering Decisions

### Data Strategy

| Approach | Description |
|---|---|
| Custom Dataset | Backend uses a curated food dataset instead of relying solely on external APIs |
| Consistency | Ensures stable naming, structure, and predictable data behavior |
| Localization | Provides Turkish food data coverage |
| Extensibility | System is designed to support future API integrations |

---

### Hybrid Data Handling

| Data Type | Source |
|---|---|
| Food Data | Static dataset (backend-controlled) |
| Exercise Data | Dynamic API-based or normalized backend source |

This hybrid approach demonstrates both controlled data management and external API integration capability.

---

### Architecture Strategy

| Principle | Description |
|---|---|
| Layered Architecture | Separation of controllers, services, repositories, and middleware |
| Modularity | Independent frontend and backend layers |
| Scalability | Designed for future feature and data expansion |
| Maintainability | Clear separation of concerns simplifies debugging and updates |

---

### UI/UX Strategy

| Decision | Reason |
|---|---|
| Drawer-based input system | Prevents navigation disruption and preserves dashboard context |
| Dashboard-centered flow | Keeps user interactions within a single view |
| Custom CSS approach | Provides full control over layout and design |
| Component-based structure | Enables reusable and maintainable UI elements |

---

## System Capabilities

| Domain | Capability |
|---|---|
| Authentication | Secure user registration, login, and session management |
| Meal Tracking | Create, retrieve, and delete date-based meal records |
| Exercise Tracking | Create, retrieve, and delete exercise records |
| Hydration Tracking | Track and update daily water consumption |
| Date-Based Filtering | Filter all records by selected date |
| Dashboard | Display aggregated daily metrics and summaries |
| Real-Time UI Updates | Update UI state without full page reload |
| Data Management | Hybrid approach using static datasets and API-driven data |
| Persistence | MSSQL-backed storage for all user-generated data |
| Architecture | Layered backend with modular frontend structure |

---

## Architecture

### Backend Architecture

| Layer | Responsibility |
|---|---|
| Controllers | Handle HTTP requests and responses |
| Services | Contain business logic |
| Repositories | Manage database operations |
| Middleware | Handle authentication and request validation |

---

### Frontend Architecture

| Layer | Responsibility |
|---|---|
| Pages | Route-level UI views |
| Components | Reusable UI elements |
| Services | API communication layer |
| State | Client-side state management |

---

## Data Flow

### Read Flow

```text
User selects date
→ Frontend sends request with date parameter
→ Backend processes request
→ Database query is executed
→ Filtered data is returned
→ UI updates without full page reload
```

---

### Write Flow

```text
User submits data (meal / exercise / water)
→ Frontend sends API request
→ Backend validates payload
→ Data is stored in MSSQL
→ Updated data is returned
→ UI reflects changes instantly
```

---

## Technologies

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js | Component-based UI rendering |
| Frontend | JavaScript (ES6+) | Application logic |
| Frontend | CSS | Custom styling and layout control |
| Frontend | React Router | Client-side routing |
| Backend | Node.js | Runtime environment |
| Backend | Express.js | REST API and routing |
| Database | Microsoft SQL Server | Relational data persistence |
| DB Client | mssql | MSSQL connection and query execution |
| Auth | JSON Web Token (JWT) | Authentication and session management |
| Security | bcrypt | Password hashing |

---

## Getting Started

### Prerequisites

- Node.js
- npm
- Microsoft SQL Server
- Git

---

### Clone Repository

```bash
git clone https://github.com/tugcesogukkuyu/daily-fuel-tracker-web.git
cd daily-fuel-tracker-web
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Database Setup

### Create Database

Create a database named:

```text
daily_fuel_tracker
```

---

### Apply Schema

Execute SQL files located in:

```text
server/database/schema/
```

---

### Optional Seed

```text
server/sql/foods-seed.sql
```

---

## Environment Configuration

Create a `.env` file inside the `server` directory.

### Environment Variables

| Variable | Description |
|---|---|
| PORT | Backend server port |
| NODE_ENV | Application environment |
| CLIENT_URL | Allowed frontend origin |
| JWT_SECRET | Secret key for JWT |
| COOKIE_SAME_SITE | Cookie policy |
| COOKIE_SECURE | Cookie security flag |
| DB_USER | MSSQL username |
| DB_PASSWORD | MSSQL password |
| DB_SERVER | MSSQL server address |
| DB_PORT | MSSQL port |
| DB_NAME | Database name |

### Example

```env
PORT=5050
NODE_ENV=development
CLIENT_URL=http://localhost:5173

JWT_SECRET=your_secret_key

COOKIE_SAME_SITE=lax
COOKIE_SECURE=false

DB_USER=sa
DB_PASSWORD=your_password
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=daily_fuel_tracker
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---|---|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/logout |

---

### Meals

| Method | Endpoint |
|---|---|
| GET | /api/meals |
| POST | /api/meals |
| DELETE | /api/meals/:id |

---

### Exercises

| Method | Endpoint |
|---|---|
| GET | /api/exercises |
| POST | /api/exercises |
| DELETE | /api/exercises/:id |

---

### Water

| Method | Endpoint |
|---|---|
| GET | /api/water |
| POST | /api/water |

---

## Example Request

### Create Meal

```http
POST /api/meals
Content-Type: application/json
```

```json
{
  "name": "Chicken Salad",
  "calories": 350,
  "protein": 30,
  "carbs": 20,
  "fat": 10,
  "date": "2026-04-06"
}
```

---

## Example Response

```json
{
  "id": 1,
  "name": "Chicken Salad",
  "calories": 350,
  "date": "2026-04-06"
}
```

---

## Screenshots

Screenshots are available under:

```text
docs/screenshots/
```

---

## Current Status

| Area | Status |
|---|---|
| Frontend (React UI) | Completed |
| Backend (API layer) | Completed |
| MSSQL integration | Completed |
| Authentication system | Completed |
| Meal / Exercise / Water tracking | Completed |
| Date-based filtering logic | Completed |
| Dashboard UI | Completed |

### Remaining Work

- production deployment
- environment hardening
- performance optimization
- UI/UX polish

---

## License

MIT