# Event Management Platform

Reusable full-stack Event Management Website for college events.

**Stack:** Next.js 15 · TypeScript · Tailwind · Prisma · Neon · Resend · Vercel Blob · Custom auth

Default seed event: **TechVista 2026** (College Tech / Cultural Fest)

## Student deployment (no terminal required)

1. This repo is already on GitHub.
2. Go to [vercel.com](https://vercel.com) → Import this repository.
3. Add environment variables (see `.env.example`).
4. Deploy.
5. After deploy, call `POST /api/setup` once to create Super Admin + seed data.
6. Login at `/admin/login`.

### Required env vars

| Variable | Source |
|----------|--------|
| `DATABASE_URL` | Neon console |
| `AUTH_SECRET` | Random 32+ char string |
| `SESSION_SECRET` | Random 32+ char string |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL |
| `RESEND_API_KEY` | resend.com |
| `RESEND_FROM_EMAIL` | Verified sender or onboarding@resend.dev |
| `RESEND_FROM_NAME` | e.g. TechVista 2026 |
| `BLOB_READ_WRITE_TOKEN` | Vercel Storage → Blob |

### Default Super Admin (after setup)

- Email: `admin@example.com` (or `INITIAL_ADMIN_EMAIL`)
- Password: `ChangeMe123!` (or `INITIAL_ADMIN_PASSWORD`)

**Change these immediately after first login.**

## Features included

- Event configuration + branding
- Public homepage + registration
- 3 registration modes (Open / RSVP / Invitation)
- Unique tickets + secure QR tokens
- Ticket verification + staff check-in
- SPOC assignment on tickets
- Custom auth + RBAC roles
- Admin dashboard skeleton
- One-time browser setup (no CLI)

## Local development (optional)

```bash
npm install
cp .env.example .env.local
# fill env values
npx prisma db push
npm run dev
```

## License

Open educational template for college students and event organizers.
