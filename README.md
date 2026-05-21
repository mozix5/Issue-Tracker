# Issue Tracker

A full-stack, AI-powered issue tracking application built with Next.js 14. Create, manage, and triage software issues with a polished UI and real-time Kanban board.

---

## Features

- **Issue Management** — Create, edit, delete, and filter issues with status and priority tracking
- **AI Triage** — Uses Google Gemini to automatically suggest priority levels based on issue content
- **Kanban Board** — Drag-and-drop board with live status updates
- **Comments and Threads** — Threaded comment system with voting and reply support
- **Activity Log** — Full audit trail of every change made to an issue
- **Authentication** — Email/password credentials and Google OAuth via NextAuth
- **Role-based Access** — Unauthenticated users can view issues; actions require sign-in
- **Theme Switcher** — Multiple DaisyUI themes with live preview
- **Responsive Design** — Mobile-first layout across all pages

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + DaisyUI |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Auth | NextAuth v4 (Credentials + Google) |
| AI | Google Gemini (`@google/generative-ai`) |
| Forms | React Hook Form + Zod |
| Drag and Drop | `@hello-pangea/dnd` |
| Charts | Recharts |
| Markdown | SimpleMDE + react-markdown |
| Notifications | Sonner |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (PostgreSQL)
- A [Google Cloud](https://console.cloud.google.com) OAuth app
- A [Google AI Studio](https://aistudio.google.com) API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/issue-tracker.git
cd issue-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Database (Supabase connection pooler URL)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Gemini AI
GEMINI_API_KEY="your-gemini-api-key"
```

> Generate `NEXTAUTH_SECRET` with `openssl rand -base64 32`

### 4. Push the database schema

```bash
npx prisma db push
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
├── api/                  # API routes (issues, comments, auth, AI triage)
├── auth/                 # Custom sign-in and sign-up pages
├── components/           # Shared UI components (Navbar, Toast, Forms)
├── issues/
│   ├── [id]/             # Issue detail page with comments and activity log
│   ├── board/            # Kanban board
│   └── list/             # Filterable issue list
├── globals.css           # Global styles and SimpleMDE overrides
├── page.tsx              # Dashboard with charts and quick actions
└── layout.tsx            # Root layout with providers
prisma/
└── schema.prisma         # Database schema
```

---

## Deployment

This app is configured for Vercel. The `postinstall` script automatically runs `prisma generate && prisma db push` on every deploy.

Add all environment variables from the section above to your Vercel project settings before deploying.

---

## License

MIT
