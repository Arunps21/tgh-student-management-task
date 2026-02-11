# Student Management System API

A RESTful API for managing students and their tasks, built with Express.js, TypeScript, and MongoDB Atlas.

---

## Live API URL

```
http://localhost:5000
```

---

## ENV Variables

Create a `.env` file in root directory:

```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/studentManagement
JWT_SECRET=s3cur3_jwt_s3cret_k3y_2026
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=Admin@123
```

| Variable         | Description                     | Example                      |
| ---------------- | ------------------------------- | ---------------------------- |
| `PORT`           | Server port                     | `5000`                       |
| `MONGO_URL`      | MongoDB Atlas connection string | `mongodb+srv://...`          |
| `JWT_SECRET`     | Secret key for JWT              | `s3cur3_jwt_s3cret_k3y_2026` |
| `ADMIN_EMAIL`    | Default admin email             | `admin@gmail.com`            |
| `ADMIN_PASSWORD` | Default admin password          | `Admin@123`                  |

---

## Installation & Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Seed Admin User**

   ```bash
   npm run seed
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

---

## Project Structure

```
src/
├── config/         # Database connection
├── controllers/    # Request handlers
├── middlewares/    # Auth middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── seed/           # Database seeder
├── utils/          # Utility functions
└── index.ts        # App entry point
```

---

## Authentication

Send JWT token in request headers:

```
token: <your_jwt_token>
```

---

## API Documentation

### 1. Auth Routes

#### POST `/auth/admin/login`

Admin login.

**Request Body:**

```json
{
  "email": "admin@gmail.com",
  "password": "Admin@123"
}
```

**Success Response:**

```json
{
  "success": true,
  "msg": "Login success",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### POST `/auth/student/login`

Student login.

**Request Body:**

```json
{
  "email": "john@student.com",
  "password": "john123456"
}
```

---

### 2. Admin Routes

> All admin routes require `token` header with admin JWT.

#### POST `/admin/addstudent`

Add a new student.

#### GET `/admin/viewstudents`

Get all students.

#### GET `/admin/viewstudent/:id`

Get a single student.

#### POST `/admin/deletestudent/:id`

Delete a student.

#### POST `/admin/assigntask`

Assign a task to a student.

#### GET `/admin/viewtasks`

Get all tasks.

#### GET `/admin/studenttasks/:studentId`

Get tasks for a specific student.

---

### 3. Student Routes

> All student routes require `token` header with student JWT.

#### GET `/student/mytasks`

Get all tasks assigned to logged-in student.

#### GET `/student/task/:taskId`

Get a single task.

#### POST `/student/completetask/:taskId`

Mark a task as completed.

---

## Default Admin Credentials

```
Email: admin@gmail.com
Password: Admin@123
```

Run `npm run seed` to create the admin user if not exists.

---

## Deployment (Vercel)

This project is configured for Vercel deployment.

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

Configuration is in `vercel.json`.
