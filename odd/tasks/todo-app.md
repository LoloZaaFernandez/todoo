# ODD Task List: Todo App (`todo-app`)

## Objective
Build a complete, polished ToDo web application matching the visual mockup (`proyecto.png`), featuring Hoy, Nueva tarea, Próximas, Calendario, Detalle de tarea, and Completadas views with local persistence and responsive layout.

## Scope
- **Included**: Vite + React + TypeScript + Tailwind CSS setup, state management with LocalStorage, all 6 UI views from the mockup, subtasks, priorities, dates, and celebratory completion screen.
- **Excluded**: Backend server/database (client-side storage is sufficient for this application).

## Constraints
- Match the visual aesthetics and layout of the mockup (clean, modern SaaS look, soft indigo/blue accents, subtle shadows, clean typography).
- Fully responsive (works as mobile app view or desktop dashboard as shown in mockup).

---

## Actionable Checklist

- [ ] **Task 1: Project Bootstrap & Setup**
  - **Route**: inline
  - **Description**: Initialize Vite + React + TypeScript + Tailwind CSS project with Lucide React icons.
  - **Checks**: `npm run build` succeeds.

- [ ] **Task 2: Core Data Model & State Management**
  - **Route**: inline
  - **Description**: Define Task interface (id, title, date, time, priority [baja|media|alta], subtasks, notes, repeat, completed) and custom hook with LocalStorage sync and sample initial data matching mockup.
  - **Checks**: State loads, persists, and updates correctly.

- [ ] **Task 3: Layout & Navigation Shell**
  - **Route**: inline
  - **Description**: Create sidebar/bottom nav supporting switching between Hoy, Próximas, Calendario, Listas, and Completadas.
  - **Checks**: Navigation switches active views correctly.

- [ ] **Task 4: View 1 — Hoy (Today)**
  - **Route**: inline
  - **Description**: Implement Today view with greeting, progress bar (completed/total percentage), task list with checkboxes, time, and quick actions.
  - **Checks**: Renders tasks for today and updates progress bar on toggle.

- [ ] **Task 5: View 2 — Nueva Tarea (Create/Edit Modal)**
  - **Route**: inline
  - **Description**: Implement modal form for creating tasks with title, date selector (Hoy, Mañana, Elegir fecha), time, and priority buttons (Baja, Media, Alta).
  - **Checks**: Creating a task adds it to the list and closes modal.

- [ ] **Task 6: View 3 — Próximas (Upcoming)**
  - **Route**: inline
  - **Description**: Implement Upcoming view grouping tasks by date (Mañana, Próximos días, Esta semana).
  - **Checks**: Tasks correctly grouped and displayed by relative date.

- [ ] **Task 7: View 4 — Calendario (Calendar)**
  - **Route**: inline
  - **Description**: Implement Calendar view with month grid (May 2025 style with activity dots) and selected day detail panel.
  - **Checks**: Selecting a day filters and displays tasks for that day.

- [ ] **Task 8: View 5 — Detalle de Tarea (Task Detail)**
  - **Route**: inline
  - **Description**: Implement task detail inspection panel with subtasks checkable list, notes, repeat settings, and delete action.
  - **Checks**: Editing subtasks, notes, and deleting tasks work interactively.

- [ ] **Task 9: View 6 — Completadas (Completed)**
  - **Route**: inline
  - **Description**: Implement Completed view celebrating weekly progress with summary stats and weekly activity chart.
  - **Checks**: Displays completed count and celebration message.

- [ ] **Task 10: Verification & Polish**
  - **Route**: inline
  - **Description**: Perform full build check, test interactions across views, and ensure visual parity with mockup.
  - **Checks**: Clean build, no console errors, smooth interactions.
