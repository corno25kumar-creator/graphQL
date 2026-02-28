<img width="1441" height="623" alt="image" src="https://github.com/user-attachments/assets/d6d0a0d8-3351-43c8-a6db-3a509e1a3c56" />


# 📚 BookVerse – Full Stack GraphQL Book Management System

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Apollo](https://img.shields.io/badge/Apollo-GraphQL-purple)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![License](https://img.shields.io/badge/License-ISC-lightgrey)

A modern **production-style Full Stack GraphQL application** built with Apollo Server, Next.js, and MongoDB Atlas.

This project demonstrates scalable GraphQL architecture, clean backend modularization, real-time client updates, and cloud database integration.

---

# 🚀 Project Overview

BookVerse is a full-stack application that allows users to:

* 📖 Fetch books using GraphQL queries
* ➕ Create books using GraphQL mutations
* ⚡ Experience instant UI updates with Apollo cache
* 🌐 Communicate securely between frontend and backend
* ☁ Store data in MongoDB Atlas cloud database

---

# 🏗 System Architecture

```
Client (Next.js + Apollo Client)
        ↓
GraphQL Endpoint (/graphql)
        ↓
Apollo Server (Express)
        ↓
MongoDB Atlas (Cloud Database)
```

---

# 🛠 Tech Stack

## 🎨 Frontend

* React 19
* Next.js 16
* Apollo Client
* PrimeReact
* Formik + Yup
* Zustand
* TypeScript

---

## 🚀 Backend

* Apollo Server v4
* Express.js
* MongoDB Atlas
* Mongoose
* CORS
* TypeScript
* TSX (TypeScript runtime)

---

## ☁ Database

* MongoDB Atlas (Cloud-hosted NoSQL database)

---

# 📂 Folder Structure

```
project/
│
├── backend/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── db/
│   │   │   └── graphql/
│   │   └── index.ts
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── .vscode/
    └── tasks.json
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd project
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
PORT=3001
MONGO_URI=your_mongodb_atlas_connection_string
```

Run backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:3001/graphql
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SERVER_URL=http://127.0.0.1:3001
NEXT_PUBLIC_AUTH_TOKEN=your_token
```

Run frontend:

```bash
npm run dev
```

Open:

```
http://127.0.0.1:3000
```

---

# 🧪 Development Automation

This project includes VS Code tasks for running both servers simultaneously.

```
Ctrl + Shift + P → Run Task → Dev All
```

---

# 🔐 Environment Variables

### Backend

| Variable  | Description                     |
| --------- | ------------------------------- |
| PORT      | Backend port                    |
| MONGO_URI | MongoDB Atlas connection string |

### Frontend

| Variable               | Description         |
| ---------------------- | ------------------- |
| NEXT_PUBLIC_SERVER_URL | Backend base URL    |
| NEXT_PUBLIC_AUTH_TOKEN | Authorization token |

---

# 🧠 Engineering Highlights

* Modular GraphQL schema design
* Custom GraphQL context
* Centralized error handling
* MongoDB Atlas IP whitelisting
* Apollo Client middleware
* Environment-based configuration
* Full-stack TypeScript
* Clean separation of concerns
