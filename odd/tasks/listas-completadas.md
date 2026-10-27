# ODD Task List: Listas & Completadas (`listas-completadas`)

## Objective
Make the "Listas" (categories) and "Completadas" views work with real data instead of static mockups.

## Scope
- **Included**: `completedAt` on tasks (local + Supabase), real weekly progress in Completadas, category detail view in Listas with 5 fixed categories.
- **Excluded**: custom/user-defined categories (needs new table + RLS; deferred).

## Constraints
- Categories stay fixed: Personal, Trabajo, Estudio, Salud, Finanzas.
- Dates use `localDateString` (America/Lima), never `toISOString().split('T')[0]`.
- Branch `feat/listas-completadas`; merging to `master` auto-deploys to Vercel.
- Supabase needs `alter table tasks add column completed_at timestamptz;` BEFORE merging, or toggles fail in production.

## Checklist

- [x] **T1: completedAt model + persistence**
  - **Route**: delegated direct (writer)
  - Add `completedAt?: string` (ISO) to `Task`; set on complete, clear on uncomplete; map `completed_at` in fetch/insert/update; mock completed tasks get a completedAt.
  - **Checks**: `npm run build`.

- [ ] **T2: Completadas with real data**
  - **Route**: delegated direct (writer)
  - "This week" count and Mon–Sun strip from `completedAt` (current week, local time); history sorted by completion date desc showing the completion date; legacy tasks without `completedAt` fall back to `date`.
  - **Checks**: `npm run build`.

- [ ] **T3: Listas category detail**
  - **Route**: delegated direct (writer)
  - Click a category card opens its task list (pending first, then completed) with toggle, task detail, back button, and "new task" preselecting the category.
  - **Checks**: `npm run build`.

## Progress
- Branch created. Nothing implemented yet.

## Next step
Delegate T1 to T3 to one writer; user runs the Supabase SQL.
