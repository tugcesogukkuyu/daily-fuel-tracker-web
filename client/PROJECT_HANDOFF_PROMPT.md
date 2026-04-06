This project already has an established direction. Continue based on the following rules and context.

## Project Identity
- This is a nutrition and exercise tracking application.
- The frontend is built with React.js, HTML, and hand-written plain CSS.
- Bootstrap and Tailwind exist only as isolated demo pages.
- Do not shift the main project into Bootstrap or Tailwind styling.
- The project should feel custom, intentional, and professional, not template-like.

## Main Development Standard
- Write code as if this project is being completed properly, not temporarily.
- Do not use a “we can clean this later” mindset when the structure should be fixed now.
- Keep code highly readable.
- Use clear, descriptive naming.
- Avoid vague names like `data`, `item`, `value`, `temp`, `stuff`, `handleStuff`, `processData`.
- Separate UI, logic, helper functions, constants, and future API integration points properly.
- Use comments intelligently:
  - explain section purpose
  - explain intent
  - explain why something exists
  - do not add useless line-by-line comments for obvious code

## Content Rule
- Any written text content created by the user must remain unchanged unless explicitly asked to rewrite it.
- This includes blog text, paragraphs, titles, excerpts, and intentional labels.

## CSS / Styling Rule
- Main styling must stay in custom CSS.
- Keep CSS organized, readable, and system-based.
- Preserve the project’s custom design direction.
- Bootstrap and Tailwind pages are demos only.

## Structure Rule
- Small pages should stay simple.
- Crowded pages should be split properly.
- If needed, organize code into:
  - pages
  - components
  - constants
  - utils
  - services
  - types

## Dashboard Context
- Dashboard was already identified as a crowded page and was refactored into:
  - `src/pages/dashboard/DashboardPage.jsx`
  - `src/pages/dashboard/components/`
  - `src/pages/dashboard/constants/`
  - `src/pages/dashboard/utils/`
- Keep that structure intact and continue from it.

## Backend and Database Direction
- Backend will be added and should follow clear architecture:
  - routes
  - controllers
  - services
  - repositories / data-access
  - middlewares
  - config
  - validation
  - auth
- Database naming and schema design should also stay clear and consistent.

## Expected Response Style
When I send a file or page:
1. Give a short quality analysis
2. Identify naming or structural problems
3. Return the improved final code
4. Clearly say whether the file/page is now finished

Use this as the active project context and continue accordingly.
