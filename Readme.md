# 📚 Library Management System

A full-stack Library Management System built with **Spring Boot**, **MongoDB**, **React**, and **TailwindCSS**. It supports role-based access, JWT authentication, book reservations, and an admin dashboard.

---

## 🌐 Live Demo

🚀 [GitHub Repository](https://github.com/shishiro26/library-management-system)  
🔗 _Deploy backend using Render/Railway and frontend using Vercel/Netlify._

---

## 🛠️ Tech Stack

### Frontend

- **React 18**
- **React Router**
- **TailwindCSS**
- **Axios**
- **JWT Authentication**
- **Context API**

### Backend

- **Java 21**
- **Spring Boot 3.2.0**
- **Spring Security**
- **MongoDB**
- **JWT (JSON Web Tokens)**
- **CORS Configuration**
- **Maven**

---

## ✨ Features

### 👨‍💼 User Features

- Signup/Login with JWT
- Browse and search books
- Filter books by category
- Reserve and return books
- View reservation history
- Manage profile information

### 🛡️ Admin Features

- Manage books (Add/Edit/Delete)
- View all users and reservations
- Access admin-only dashboard
- Monitor system usage

---

## 📁 Project Structure

```

project-root/
├── frontend/       # React + TailwindCSS
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── context/
│       └── App.js
├── backend/        # Spring Boot + MongoDB
│   └── src/main/java/com/library/
│       ├── controller/
│       ├── model/
│       ├── repository/
│       ├── service/
│       └── config/

````

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- Java 21
- MongoDB (local or cloud)
- Maven 3.6+

---

### 🔧 Backend Setup

```bash
cd backend
mvn clean install
````

1. Ensure MongoDB is running locally at `mongodb://localhost:27017`
2. Copy the sample properties file:

   ```bash
   cp src/main/resources/application.sample.properties src/main/resources/application.properties
   ```
3. Update values in `application.properties` (e.g., JWT secret, DB name, CORS origin)
4. Run the backend server:

   ```bash
   mvn spring-boot:run
   ```

The backend will be available at: `http://localhost:8080/api`

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

* App runs at: `http://localhost:3000`
* Communicates with backend at: `http://localhost:8080/api`

---

## 🔐 Authentication

* Users receive a **JWT token** upon login.
* Include the token in API requests:

  ```
  Authorization: Bearer <token>
  ```

---

## 📦 API Overview

### Auth

* `POST /api/auth/signup` — Register user
* `POST /api/auth/login` — Login
* `GET /api/auth/me` — Fetch logged-in user info

### Books

* `GET /api/books` — List books
* `POST /api/books` — Add book (Admin)
* `PUT /api/books/{id}` — Update book (Admin)
* `DELETE /api/books/{id}` — Delete book (Admin)
* `POST /api/books/{id}/reserve` — Reserve book
* `POST /api/books/{id}/return` — Return book

### Users

* `GET /api/users` — List all users (Admin)
* `GET /api/users/{id}` — Get user info
* `PUT /api/users/{id}` — Update user

### Reservations

* `GET /api/reservations` — All reservations
* `GET /api/reservations/user/{userId}` — User’s reservations
* `POST /api/reservations/{id}/return` — Return a book
* `POST /api/reservations/{id}/cancel` — Cancel reservation

---

## 🧪 Sample Admin Credentials

```text
Email: admin@library.com
Password: admin123
```

---

## 📚 Sample Data

Automatically loaded on first run:

* 10 classic books (e.g., *The Hobbit*, *1984*, *Pride and Prejudice*)
* Admin account
* Sample users

---

## 🧠 Developer Notes

* **CORS**: Backend must allow requests from `http://localhost:5173`
* **JWT**: Stored in `localStorage`, included in every secure request
* **TailwindCSS**: Used for clean, responsive UI
* **React Context**: Handles global authentication state

---
