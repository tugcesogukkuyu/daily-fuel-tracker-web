# Project Context

## Project Summary

This project is a nutrition and exercise tracking application built with React.js, HTML, and plain CSS. The goal is to create a clean, readable, well-structured, production-style codebase rather than a temporary demo.

The project includes:
- dashboard
- meal adding
- exercise adding
- calendar tracking
- blog listing and blog detail pages
- authentication pages
- later backend, database, user login, and data persistence

The codebase should be treated as a real application that will be completed properly, not as a throwaway prototype.

---

## Core Technology Decisions

### Frontend
- React.js is the main frontend framework.
- The main styling system is plain CSS written manually in `index.css`.
- HTML structure + CSS class-based styling is the main design approach.
- Bootstrap and Tailwind exist only as isolated demo pages.
- Bootstrap and Tailwind must not become the main styling strategy of the application.

### Styling Approach
- The main UI must continue using custom CSS.
- CSS should be organized professionally with:
  - design tokens where useful
  - consistent spacing
  - consistent border radius
  - reusable card/button/input patterns
  - readable section comments
  - responsive behavior written intentionally
- Styling should feel custom, deliberate, and polished.
- The project should not feel like a generic template.

### Architecture Direction
- The project should be structured now in a way that supports backend and database integration later.
- We are not using a “we can clean it up later” approach.
- If a page is too crowded, it should be split now into:
  - page
  - components
  - constants
  - helpers/utils
- UI, state handling, static data, helper logic, and API integration points should be separated clearly.

---

## Code Quality Rules

The project follows these code quality expectations:

- Code must be readable without depending on comments for every line.
- Naming must be explicit, descriptive, and context-aware.
- Avoid vague names like:
  - `data`
  - `item`
  - `value`
  - `temp`
  - `stuff`
  - `handleStuff`
  - `processData`
- Variable, function, state, component, constant, helper, and file names should explain their role clearly.
- Comments should be used intelligently:
  - explain section purpose
  - explain intent
  - explain why something exists
  - do not explain obvious syntax line by line
- Small files should not be over-split unnecessarily.
- Large or crowded files should be split before they become unmanageable.
- UI code should not be cluttered with unrelated logic.
- Repeated JSX should be reduced through data-driven rendering when appropriate.
- Static content written by the user should not be rewritten unless explicitly requested.

---

## Important Content Rule

Text content written by the user must remain unchanged unless the user explicitly asks for copywriting or rewriting help.

This includes:
- blog text
- paragraphs
- headings
- excerpts
- labels written intentionally by the user

Code may be reorganized, renamed, or refactored, but written content should stay the same.

---

## Current Frontend Structure Principles

Inside `client/src/`, the code should generally follow this mindset:

- `pages/` for page-level screens
- `components/` for reusable UI pieces
- `services/` for API request logic
- `utils/` for helper functions
- `types/` for shared type/model structures if needed
- `assets/` for images and static imported resources
- `routes/` for route-related organization if used

Pages should not become giant all-in-one files if their responsibilities grow.

---

## Dashboard Refactor Status

The dashboard was identified as one of the most crowded pages and was refactored into a more structured feature folder.

Current dashboard structure should follow this pattern:

- `src/pages/dashboard/DashboardPage.jsx`
- `src/pages/dashboard/components/`
- `src/pages/dashboard/constants/`
- `src/pages/dashboard/utils/`

Dashboard was intentionally split so that:
- `DashboardPage.jsx` acts as the orchestration layer
- visual sections are separated into focused components
- static dashboard data lives in constants
- helper logic lives in utils
- repeated UI blocks are reduced

This structure should be preserved and extended rather than collapsed back into one file.

---

## Page Refactor Expectations

Pages that were reviewed were being upgraded toward this standard:

### AddMealPage
Expected quality direction:
- clearer naming
- extracted constants
- helper functions for filtering and totals
- more readable JSX
- comments for section purpose
- structure ready for future API integration

### AddExercisePage
Expected quality direction:
- clearer naming
- extracted duration options and activity constants
- helper functions for calculations
- cleaner interaction handlers
- comments for section purpose
- future-ready structure for saving exercise data

### CalendarPage
Expected quality direction:
- clear month and day naming
- safe fallback data
- cleaner summary logic
- separation of month metadata and entry data
- comments that explain page sections

### BlogPage and BlogDetailPage
Expected quality direction:
- better naming for blog content structures
- separate content/data from page rendering where appropriate
- preserve all written content exactly
- make the page files act like renderers, not raw content dumps

### Demo Pages
Bootstrap and Tailwind demo pages are allowed to stay small and simpler, but:
- repeated JSX should still be cleaned up when obvious
- naming should still be readable
- comments should still be used professionally
- they should remain demos, not become the app’s styling foundation

---

## Backend Direction

The backend is planned and should be built with similar code quality principles.

Expected backend structure:
- routes
- controllers
- services
- repositories or data-access layer
- middlewares
- config
- validation
- auth-related separation

Backend rules:
- routes should only define endpoints and connect handlers
- controllers should manage request/response flow
- services should contain business logic
- repositories/data-access should manage database operations
- database queries should not be embedded directly into unrelated layers
- auth, validation, and error handling should be organized clearly

---

## Database Direction

Database work should also follow readable, structured naming.

Database expectations:
- table names must be clear
- column names must be clear
- model names must be clear
- relationships should be intentional
- migrations and schema changes should remain organized
- raw query logic should not leak into unrelated layers
- naming should be consistent across frontend, backend, and database when possible

---

## Working Style Expected From Codex

When helping on this project, Codex should:

- prioritize readable, production-style code
- preserve the main project direction
- not switch the project into another styling paradigm
- not push cleanup into “later” if the structure should be fixed now
- keep comments useful and professional
- keep naming explicit
- separate responsibilities thoughtfully
- avoid bloated explanations when code can show the answer
- keep the user’s original written content unchanged unless asked otherwise

When reviewing or rewriting files, the expected output style is:
1. short quality analysis
2. naming or structural problems
3. improved final code
4. clear judgment on whether the page/file is now finished

---

## Non-Negotiable Project Identity

These points should be preserved:
- main frontend is React + HTML + hand-written CSS
- Bootstrap and Tailwind are demo-only
- the project should feel custom, not generic
- code quality should look deliberate and professional
- refactors should improve structure, not just make code “work”
- the project is being built to finish properly, not to remain half-demo, half-prototype

---

## Use This Context In New Conversations

If this file is shared into a new chat, it should be treated as the current project memory and coding standard for the repository.

The assistant should continue from this context instead of defaulting to generic assumptions.
