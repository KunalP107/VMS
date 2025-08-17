# Visitor Management System — Frontend (React + Vite) with Auth

A production-ready React frontend for your Visitor Management System (VMS), now with **Login / Register / Logout**.

## ✅ Features
- Auth pages: **Login** (`/login`) and **Register** (`/register`)
- Stores JWT in `localStorage` under key `VITE_AUTH_TOKEN_KEY` (default `token`)
- Protected routes for Visitors CRUD; redirects to `/login` if not authed
- React Hook Form + Zod for visitor form validation
- Axios client with auth interceptor
- Minimal, elegant UI — easy to theme
- Ready for CI/CD builds (Vite)

## 🔌 Expected Auth API
```
POST /auth/register   body { name, email, password }  -> returns { token? }
POST /auth/login      body { email, password }        -> returns { token }
```
If your backend returns `{ data: { token } }` instead, it’s supported.

## 🚀 Quick Start
```bash
# 1) unzip, then:
cd vms-frontend

# 2) Install
npm install

# 3) copy env example to configure API URL
cp .env.example .env
# edit .env (VITE_API_URL, VITE_AUTH_TOKEN_KEY)

# 4) Run
npm run dev
```

## 🧩 Customize
- Update fields in `src/components/VisitorForm.jsx` to match your schema.
- Adjust table columns in `src/pages/VisitorsList.jsx`.
- Extend auth to fetch `/auth/me` if you want user profiles in the navbar.