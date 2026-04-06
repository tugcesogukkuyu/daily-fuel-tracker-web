# Daily Fuel Tracker

A full-stack nutrition and exercise tracking application built with React, Node.js, Express, and MSSQL.

---

## System Overview

Daily Fuel Tracker is designed as a full-stack system where users can track meals, exercises, and water intake on a daily basis.

The application is built with a clear separation between frontend and backend layers, handling authentication, data persistence, and date-based filtering logic.

---


## Engineering Decisions

This project was built with several intentional engineering decisions to reflect real-world development constraints and problem-solving approaches.

### Data Strategy

Instead of relying entirely on external APIs, a custom food dataset was created and used in the backend.

Reasons:
- Public APIs often lack sufficient Turkish food data
- API responses may create inconsistency in naming and structure
- A controlled dataset ensures predictable and stable behavior

The system is designed to be extendable, allowing API integration in the future if needed.

---

### Hybrid API Usage

To demonstrate API integration capability, external data handling was implemented in the exercise module.

This allows the project to showcase:
- Static data management (food)
- Dynamic API-based data (exercise)

---

### Core Capabilities

- Secure user authentication and session handling  
- Date-driven tracking system for meals, exercises, and water intake  
- Real-time UI updates without full page reload  
- Modular dashboard with reusable UI components  
- Hybrid data management (static + API-based)  
- Layered backend architecture with clear separation of concerns  

---

### Frontend Design Approach

The UI was built using custom CSS instead of relying fully on frameworks.

Reasons:
- Full control over layout and visual structure
- Ability to design a unique dashboard experience
- Better understanding of layout systems and responsiveness

Additionally:
- Bootstrap and Tailwind were explored in separate demo pages
- Figma was used to plan layout structure and UI components

---

### UI/UX Decisions

A drawer-based input system was used instead of separate pages.

Reasons:
- Prevents context switching
- Keeps users within the dashboard flow
- Improves usability and speed of interaction

---

### Architecture Preference

A layered backend structure was preferred over a simpler approach.

Reasons:
- Separation of concerns
- Easier debugging and maintenance
- Scalable for future extensions
## Architecture

The backend follows a layered architecture:

- **Controller Layer** → Handles HTTP requests and responses  
- **Service Layer** → Contains business logic  
- **Repository Layer** → Manages database operations  
- **Middleware Layer** → Handles authentication and request validation  

This structure improves scalability, maintainability, and testability.

The frontend is built using a modular component-based architecture with React, ensuring reusable UI components and clear state management.

---


## Data Flow

The system is based on a date-driven tracking logic:

1. User selects a date from the dashboard  
2. Frontend sends requests with date parameters  
3. Backend processes requests and queries the database  
4. Filtered data is returned  
5. UI updates dynamically without full page reload  

Data creation flow:

1. User submits data (meal/exercise)  
2. Request is sent to backend API  
3. Backend validates and stores data  
4. Updated data is returned and rendered instantly  

---

## API Endpoints

### Auth

- POST `/api/auth/register` → Register user  
- POST `/api/auth/login` → Authenticate user  
- POST `/api/auth/logout` → Logout  

---

### Meals

- GET `/api/meals` → Get meals by date  
- POST `/api/meals` → Add meal  
- DELETE `/api/meals/:id` → Delete meal  

---

### Exercises

- GET `/api/exercises` → Get exercises by date  
- POST `/api/exercises` → Add exercise  
- DELETE `/api/exercises/:id` → Delete exercise  

---

### Water Tracking

- GET `/api/water` → Get daily logs  
- POST `/api/water` → Add water entry  

---

### Example Request

```json
POST /api/meals

{
  "name": "Chicken Salad",
  "calories": 350,
  "protein": 30,
  "carbs": 20,
  "fat": 10,
  "date": "2026-04-06"
}
```

### Example Response

```json
{
  "id": 1,
  "name": "Chicken Salad",
  "calories": 350,
  "date": "2026-04-06"
}
```

---

## Project Structure

```
client/
 ├── src/
 │   ├── pages/
 │   ├── components/
 │   ├── services/
 │   ├── routes/
 │   └── assets/

server/
 ├── src/
 │   ├── controllers/
 │   ├── services/
 │   ├── repositories/
 │   ├── routes/
 │   ├── middleware/
 │   ├── config/
 │   └── utils/

 ├── database/
 │   └── schema/

 └── scripts/

docs/
 ├── screenshots/
 ├── database-schema.md
 ├── user-flow.md
```

---

## Installation

### Clone

```bash
git clone https://github.com/tugcesogukkuyu/daily-fuel-tracker.git
cd daily-fuel-tracker
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Database

- Run SQL Server locally  
- Create database: `daily_fuel_tracker`  
- Execute scripts in:

```
server/database/schema/
```

- Optional seed:

```
server/sql/foods-seed.sql
```

---

## Environment Variables

Create `.env` in `server`:

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

## Screenshots

Screenshots are available in:

```
docs/screenshots/
```