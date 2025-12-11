# AkademiaPro (School Management System)

Modern, themeable School Management System built with Next.js App Router. It ships with protected dashboards, CRUD flows, generic data tables, modal-driven forms, and light/dark design tokens.

## Core Features

- **Admin**: manage users/roles, teachers, students, classrooms, lessons, schedules, assignments.
- **Teacher**: view schedule; manage assignments.
- **Student**: view assignments, classrooms, schedule.
- **UI**: shared modal system, reusable TanStack-based tables, consistent pagination and accent styling.
- **Auth**: NextAuth v5 (credentials), role-aware routing.
- **Storage/Assets**: Firebase Storage (assignment files), Supabase optional.
- **Data**: Prisma + PostgreSQL.

## Tech Stack

- Next.js (App Router, TypeScript), React 18
- Prisma ORM, PostgreSQL
- NextAuth v5
- Tailwind CSS, TanStack Table
- Firebase Storage

## Getting Started

1. Clone: `git clone https://github.com/enes9103/AcademiaPro-SchoolManagementSystem.git`
2. Install: `npm install`
3. Env: copy `.env.example` → `.env` and fill DB + auth + storage keys
4. Prisma: `npx prisma generate` then `npx prisma migrate dev`
5. Run dev server: `npm run dev` → http://localhost:3000

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run lint` – lint checks
- `npx prisma migrate dev` – create/apply migrations
- `npx prisma studio` – run prisma db screen

## Contributing

See `CODE_OF_CONDUCT.md` for behavior guidelines. PRs and issues are welcome.

## License

MIT. See `LICENSE` for details.
