# RideConnect

RideConnect is a polished, resume-ready full-stack sample project demonstrating:
- Node.js + Express backend with MySQL
- JWT authentication + role-based access (admin/user)
- CRUD APIs for rides
- Simple Bootstrap-based frontend to interact with the API

---

## Quickstart (Backend)

1. Copy `.env.example` to `.env` and update credentials:
```bash
cd backend
cp .env.example .env
# edit .env to set DB_USER, DB_PASS, JWT_SECRET, etc.
npm install
npm start
```
The API will run at `http://localhost:3000`.

### API Endpoints (examples)
- `POST /api/auth/register` `{ name, email, password, role }`
- `POST /api/auth/login` `{ email, password }` → returns `{ token }`
- `GET /api/rides` → list rides (public)
- `POST /api/rides` → add ride (protected - requires token)
- `PUT /api/rides/:id` → update ride (admin only)
- `DELETE /api/rides/:id` → delete ride (admin only)

---

## Database

Import `database.sql` to create schema and seed sample data:
```sql
mysql -u root -p < database.sql
```
> Note: Seeded passwords are placeholders (`hashed_password_here`). Use the register endpoint to create users, or replace with bcrypt hashes.

---

## Frontend (Simple Bootstrap UI)

The frontend is a lightweight Bootstrap static site that calls the backend API.
To run, open `frontend/index.html` in your browser (or serve it with a static server).

---

## Notes for Recruiters / Reviewers

- This project was prepared as a resume-ready demonstration for full-stack capabilities:
  - Authentication, role-based access control, RESTful APIs, MySQL integration.
  - Clear code structure (controllers, routes, models, middleware).
- To fully demo login with seeded users, either:
  - register a new user via `/api/auth/register`, or
  - update `database.sql` to include bcrypt-hashed passwords.

---

## Next steps (optional improvements)
- Add bookings table + endpoints
- Use Sequelize or TypeORM for ORM-based models
- Add unit/integration tests
- Add Dockerfile / docker-compose for easier local setup

