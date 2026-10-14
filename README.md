# 🏛️ Pharaohs Future — Real Estate Development & Investment Platform

> Premium MERN Stack web application for Pharaohs Future real estate company.

---

## 🗂️ Project Structure

```
mern-project/
├── client/                         # React + Vite (Frontend)
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Images, fonts, icons
│   │   ├── components/
│   │   │   ├── auth/               # Auth-related components (ProtectedRoute)
│   │   │   ├── layout/             # Navbar, Footer
│   │   │   └── ui/                 # Reusable UI (LoadingSpinner, Button...)
│   │   ├── context/                # React Context (AuthContext)
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── layouts/                # Page layouts (MainLayout)
│   │   ├── pages/                  # Page-level components
│   │   ├── services/               # Axios API client + service modules
│   │   └── utils/                  # Frontend utility functions
│   ├── .env.example
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                         # Node.js + Express (Backend)
│   ├── src/
│   │   ├── config/                 # DB connection, rate limiter
│   │   ├── controllers/            # Request handlers
│   │   ├── middlewares/            # Auth, validation, error handling
│   │   ├── models/                 # Mongoose models
│   │   ├── routes/                 # Express routers
│   │   ├── services/               # Business logic layer
│   │   ├── utils/                  # AppError, catchAsync, apiResponse, logger
│   │   ├── app.js                  # Express app setup
│   │   └── server.js               # Server entry point
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── package.json                    # Root scripts
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| State | TanStack Query v5 |
| HTTP Client | Axios |
| Routing | React Router v6 |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (HTTP-only cookies) |
| Logging | Winston |
| Validation | express-validator |
| Security | Helmet, CORS, Rate Limiting, Mongo Sanitize |

---

## ⚙️ Prerequisites

- **Node.js** >= 18.0.0 — [Download](https://nodejs.org/)
- **MongoDB** — Local or Atlas (see below)
- **npm** >= 9.0.0

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd mern-project

# Install all dependencies (client + server)
npm run install:all
```

### 2. Set Up Environment Variables

**Server:**
```bash
cd server
cp .env.example .env
# Edit .env and fill in your values
```

**Client:**
```bash
cd client
cp .env.example .env
```

### 3. Set Up MongoDB

**Option A — MongoDB Atlas (Recommended for production):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Set `MONGODB_URI` in `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/pharaohs-future
   ```

**Option B — Local MongoDB:**
1. [Install MongoDB Community](https://www.mongodb.com/try/download/community)
2. Start the service: `mongod`
3. Set in `server/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/pharaohs-future
   ```

### 4. Run the Application

```bash
# From the root directory — runs both client and server
npm run dev
```

Or run separately:
```bash
# Terminal 1 — Backend (port 5000)
npm run dev:server

# Terminal 2 — Frontend (port 5173)
npm run dev:client
```

---

## 🌐 API Endpoints

Base URL: `http://localhost:5000/api/v1`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/health` | Health check | Public |
| `POST` | `/auth/register` | Register a new user | Public |
| `POST` | `/auth/login` | Login | Public |
| `POST` | `/auth/logout` | Logout | Private |
| `GET` | `/auth/me` | Get current user | Private |

---

## 🔒 Security Features

- **Helmet** — Sets secure HTTP headers
- **CORS** — Whitelisted origins only
- **Rate Limiting** — 100 req/15min globally, 10 req/15min for auth
- **Mongo Sanitize** — Prevents NoSQL injection
- **JWT HTTP-only Cookies** — XSS-safe token storage
- **bcryptjs** — Passwords hashed with cost factor 12
- **express-validator** — Input validation on all endpoints
- **No secrets in code** — All sensitive values via `.env`

---

## 📁 Path Aliases (Client)

Configured in `vite.config.js`:

```js
@/              → src/
@components     → src/components/
@pages          → src/pages/
@layouts        → src/layouts/
@hooks          → src/hooks/
@services       → src/services/
@context        → src/context/
@utils          → src/utils/
@assets         → src/assets/
```

---

## 🎨 Brand Design System

- **Primary Color**: Gold `#d4881a`
- **Background**: Dark `#0d0e14`
- **Card Background**: `#22232e`
- **Fonts**: Inter (body) · Playfair Display (headings) · Cairo (Arabic)

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run client + server concurrently |
| `npm run dev:client` | Run frontend only (port 5173) |
| `npm run dev:server` | Run backend only (port 5000) |
| `npm run install:all` | Install all dependencies |
| `npm run build:client` | Build frontend for production |

---

## 📌 Development Notes

- Figma UI designs will be implemented incrementally into the existing page structure
- Add new pages in `client/src/pages/` and register them in `client/src/App.jsx`
- Add new API routes in `server/src/routes/` and register in `server/src/app.js`
- Always use `catchAsync()` for async controllers
- Always use `AppError` for expected errors
- Always use `sendSuccess()` / `sendError()` for consistent API responses

---

## 🪙 License

Private — Pharaohs Future Real Estate © 2024
