# ODD Task List: Backend & Authentication (`backend-auth`)

## Objective
Integrate Supabase for cloud backend persistence and user authentication (Email/Password & Google OAuth) before packaging the app for Android with Capacitor.

## Scope
- **Included**: Supabase client setup, Authentication views/modal (Login, Register, Logout), migrating tasks state from `localStorage` to Supabase Postgres database with User ID association (Row Level Security), and real-time or reactive syncing.
- **Excluded**: Advanced billing or multi-tenant organizations.

## Constraints
- Keep the clean UI aesthetics intact.
- Seamless fallback or clean auth flow.

---

## Actionable Checklist

- [ ] **Task 1: Supabase Client & Database Schema Setup**
  - **Route**: inline
  - **Description**: Install `@supabase/supabase-js`, create Supabase client configuration, and define SQL schema for `tasks` table with `user_id`, `title`, `date`, `time`, `priority`, `category`, `completed`, `notes`, `repeat`, `subtasks` (JSONB).
  - **Checks**: Supabase client connects successfully.

- [ ] **Task 2: Authentication State & UI (Login / Register)**
  - **Route**: inline
  - **Description**: Implement authentication context/hook and login/register modal/screen so users can securely sign in before managing tasks.
  - **Checks**: Users can sign up, sign in, and sign out successfully.

- [ ] **Task 3: Migrate LocalStorage State to Supabase Cloud Database**
  - **Route**: inline
  - **Description**: Update `App.tsx` task management CRUD operations to fetch, insert, update, and delete tasks from Supabase tied to the authenticated user's `id`.
  - **Checks**: Tasks persist in cloud database across sessions and devices.
