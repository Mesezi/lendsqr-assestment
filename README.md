# Lendsqr Admin Dashboard

A frontend assessment project replicating the Lendsqr Admin Console — built with Next.js, TypeScript, and SCSS.

## Pages

- `/login` — Login page with form validation
- `/dashboard` — Overview with user stats and status breakdown
- `/customers/users` — Paginated users table with filtering
- `/customers/users/[userId]` — Full user detail view

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **SCSS Modules** for all styling
- **React Hook Form + Zod** for form management and validation
- **TanStack Query** for data fetching and caching
- **TanStack Table** for the users table with pagination and filtering
- **localStorage** for persisting and retrieving user detail data
- **Jest + React Testing Library** for unit tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/login` automatically.

## Running Tests

```bash
npm test
```

Tests cover:
- Login form schema validation (positive and negative scenarios)
- Utility functions (`formatDateType`, `datesAreEqual`, `formatNumberWithCommas`)
- User service (`getUsersTableData`, `getUserDetails`) including localStorage edge cases

## Mock API

User data is currently served from a local mock (`src/lib/dummyData.ts`) with 500 records and a simulated network delay. The service layer (`src/services/users.ts`) is structured to swap in a real API endpoint with minimal changes.

## Architecture Notes

- `src/app/(Dashboard)` — route group for all authenticated pages, wrapped in `DashboardLayout`
- `src/components` — reusable UI components (Button, Input, PasswordInput, DataTable, Status)
- `src/services` — data access layer, isolated from UI components
- `src/lib` — constants, utilities, and mock data
- `src/types` — shared TypeScript interfaces
- `src/hooks` — custom hooks (`useClickOutside`)
- `src/providers` — TanStack Query client provider

## Project Structure

```
src/
├── app/
│   ├── login/
│   ├── (Dashboard)/
│   │   ├── dashboard/
│   │   └── customers/users/
│   │       └── [userId]/
├── components/
│   ├── DashboardLayout/
│   ├── FormInputs/
│   └── Table/
├── services/
├── lib/
├── types/
├── hooks/
└── providers/
```
