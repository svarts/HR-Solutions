# HR Solutions

A full-stack Next.js application for managing companies, employees, and tasks, leveraging:

* **Next.js 14** – React framework with file-based routing.
* **tRPC v10** – Type-safe API layer.
* **Prisma** – ORM with MongoDB connector.
* **NextAuth.js** – Authentication with Google OAuth.
* **Framer Motion** – Animations for UI transitions.
* **Tailwind & SCSS** – Styling utilities.

---

## Features

* **Dashboard**: List companies, create new ones.
* **Company Detail**: View employees, add/delete employees.
* **Employee Detail**: View tasks, add/delete tasks.
* **Authentication**: Google sign-in via NextAuth.
* **Protected Routes**: Accessible only if authenticated.
* **Animations**: Modal transitions, list item animations.

---

## Prerequisites

* Node.js v18+
* npm or Yarn
* MongoDB Atlas cluster

---

## Environment Variables

Create a `.env.local` file in project root with:

```env
# MongoDB
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_SECRET=<a-32-byte-random-hex>
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

Generate `NEXTAUTH_SECRET`:

```bash
openssl rand -hex 32
# or
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Installation & Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   * App runs on: `http://localhost:3000`

---

## Project Structure

```
├── prisma/
│   └── schema.prisma    # MongoDB schema models
├── src/
│   ├── pages/
│   │   ├── api/auth/    # NextAuth handlers
│   │   ├── api/trpc/     # tRPC API handler
│   │   ├── dashboard/    # Dashboard page
│   │   ├── company/      # Company & employee pages
│   │   └── _app.tsx      # App wrapper with tRPC & NextAuth
│   ├── server/
│   │   ├── db/client.ts  # Prisma Client instantiation
│   │   ├── router/       # tRPC routers & context
│   │   └── trpc.ts       # tRPC initialization
│   ├── lib/
│   │   └── mongodb.ts    # MongoDB client for NextAuth adapter
│   └── utils/
│       ├── trpc.ts       # tRPC React hooks
│       └── DefaultQueryCell.tsx # Query loading/success/error UI
└── README.md             # This file
```

---

## tRPC Setup

* **`src/server/trpc.ts`**: Initialize tRPC with context and transformer.
* **Routers**: Defined with `t.router({ … })` and `t.procedure.query/mutation`.
* **API Handler**: `src/pages/api/trpc/[trpc].ts` uses `createNextApiHandler`.
* **Client**: `_app.tsx` wraps the app with `withTRPC`, using `httpBatchLink`.

---

## Authentication

* **Adapter**: MongoDB Adapter via `@next-auth/mongodb-adapter` and `clientPromise` (in `src/lib/mongodb.ts`).
* **Providers**: Google OAuth configured in `src/pages/api/auth/[...nextauth].ts`.
* **Callbacks**: Session callback to include `user.id`.

---

## Animations

* **List Items**: `Framer Motion` variants in `Dashboard`.
* **Modals**: `<AnimatePresence mode="wait">` in `Modal` component.

---

## Troubleshooting

* **Endless Loading**: Ensure `getAll` resolvers return a value (e.g., `[]` on error) and include `credentials: 'include'` in `httpBatchLink`.
* **Adapter Errors**: Confirm `createContext` returns both `session` and `prisma`.
* **DNS/Auth Errors**: Verify MongoDB URI, user credentials, and Network Access whitelist in Atlas.

---