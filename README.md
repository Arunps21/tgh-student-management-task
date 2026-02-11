# 🎓 Student Management System API

![Node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A simple and secure API for managing students, tasks, and admin operations, built with Node.js and TypeScript.

---

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based auth with Role-Based Access Control (Admin/Student).
- **Admin Dashboard**: Manage students (Add/View/Delete) and assign tasks.
- **Student Portal**: View assigned tasks, track status (Pending/Overdue/Completed), and mark tasks as done.
- **Task Management**: Auto-updates task status to 'Overdue' based on deadlines.
- **Type Safety**: Fully typed codebase using TypeScript.
- **Security**: Password hashing with Bcrypt, input validation, and secure headers.
- **Deployment Ready**: Configured for Vercel serverless deployment.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Auth**: JSON Web Tokens (JWT) & Bcrypt
- **Dev Tools**: Nodemon, ts-node-dev

---

## 📂 Project Structure

```bash
src/
├── config/         # Database connection configuration
├── controllers/    # Route handlers (Admin, Student, Auth)
├── middlewares/    # Authentication & Error handling middlewares
├── models/         # Mongoose schemas & TypeScript interfaces
├── routes/         # API route definitions
├── seed/           # Database seeding script
├── utils/          # Helper functions (Token generation, etc.)
└── index.ts        # Application entry point
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=Admin@123
```

---

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Arunps21/tgh-student-management-task.git
cd student-management-system
npm install
```

### 2. Database Seeding

Create the default Admin user:

```bash
npm run seed
```

### 3. Running Locally

Start the development server:

```bash
npm run dev
```

The server will start at `http://localhost:5000`.

### 4. Build for Production

Compile TypeScript to JavaScript:

```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint              | Description   | Access |
| :----- | :-------------------- | :------------ | :----- |
| `POST` | `/auth/admin/login`   | Admin login   | Public |
| `POST` | `/auth/student/login` | Student login | Public |

### 👨‍💼 Admin Routes

_Headers required: `token: <admin_token>`_

| Method | Endpoint                   | Description                      |
| :----- | :------------------------- | :------------------------------- |
| `POST` | `/admin/addstudent`        | Register a new student           |
| `GET`  | `/admin/viewstudents`      | Get list of all students         |
| `GET`  | `/admin/viewstudent/:id`   | Get details of a single student  |
| `POST` | `/admin/deletestudent/:id` | Delete a student & their tasks   |
| `POST` | `/admin/assigntask`        | Assign a task to a student       |
| `GET`  | `/admin/viewtasks`         | View all assigned tasks          |
| `GET`  | `/admin/studenttasks/:id`  | View tasks of a specific student |

### 👨‍🎓 Student Routes

_Headers required: `token: <student_token>`_

| Method | Endpoint                        | Description            |
| :----- | :------------------------------ | :--------------------- |
| `GET`  | `/student/mytasks`              | View my assigned tasks |
| `GET`  | `/student/task/:taskId`         | View task details      |
| `POST` | `/student/completetask/:taskId` | Mark task as completed |

---

## 🧪 Testing

A Postman collection is included in the repo for easy testing.
Import `postman_collection/student_management_system.postman_collection.json` into Postman.

---

## 🌍 Deployment

This project is configured for **Vercel**.

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

_(Make sure to add environment variables in your Vercel project settings)_

---

## 👤 Author

**Arun**
