# Anime Blog Server

A RESTful API backend for an Anime Blog platform, built with Node.js, Express, and PostgreSQL (managed via Prisma ORM). This server handles user registration, authentication, post management, and more.

---

## Table of Contents

-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Database Schema](#database-schema)
-   [Setup & Installation](#setup--installation)
-   [Environment Variables](#environment-variables)
-   [Running the Server](#running-the-server)
-   [API Endpoints](#api-endpoints)
-   [Authentication](#authentication)
-   [Validation](#validation)
-   [Technologies Used](#technologies-used)
-   [License](#license)

---

## Features

-   **User Registration & Login**: Secure signup and login with hashed passwords and JWT authentication.
-   **Role Management**: Users have roles (default: `author`).
-   **Post Management**: Authors can create, update, delete, and fetch posts. Posts have statuses (`DRAFT`, `PUBLISHED`).
-   **Commenting**: Posts can have comments (see Prisma schema).
-   **Validation**: Input validation using `express-validator`.
-   **CORS Support**: Configured for local and Netlify frontend origins.
-   **Health Check**: Simple endpoint for server status.

---

## Project Structure

```
.
├── .env
├── .gitignore
├── app.js
├── package.json
├── generated/
│   └── prisma/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── server/
│   ├── controller/
│   ├── middleware/
│   ├── routes/
│   └── util/
```

-   **app.js**: Main entry point, sets up middleware and routes.
-   **server/controller/**: Route handler logic (e.g., registration, login).
-   **server/middleware/**: Auth and validation middleware.
-   **server/routes/**: Express route definitions.
-   **server/util/**: Utility functions (e.g., JWT helpers).
-   **prisma/**: Database schema and migrations.

---

## Database Schema

Defined in [prisma/schema.prisma](prisma/schema.prisma):

-   **User**: id, email, password, name, role, posts
-   **Post**: id, title, content, createdAt, updatedAt, authorId, status, comments
-   **Comment**: id, title, name, content, createdAt, postId
-   **PostStatus**: Enum (`DRAFT`, `PUBLISHED`)

---

## Setup & Installation

### Prerequisites

-   Node.js (v18+ recommended)
-   PostgreSQL database

### Installation Steps

1. **Clone the repository**

    ```sh
    git clone <your-repo-url>
    cd anime-blog
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

3. **Configure environment variables**

    Create a `.env` file in the root directory:

    ```
    DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
    SECRET_KEY=your_jwt_secret
    ```

4. **Run database migrations**

    ```sh
    npx prisma migrate deploy
    ```

---

## Environment Variables

-   `DATABASE_URL`: PostgreSQL connection string.
-   `SECRET_KEY`: Secret for JWT signing.

---

## Running the Server

-   **Development**:
    ```sh
    npm run dev
    ```
-   **Production**:
    ```sh
    npm start
    ```

Server runs on [http://localhost:4000](http://localhost:4000).

---

## API Endpoints

### Health Check

-   `GET /health`  
    Returns `{ status: "ok" }`

### Authentication

-   `POST /api/registerauthor`  
    Register a new user (author).  
    **Body:** `{ username, email, password }`

-   `POST /api/login`  
    Login and receive JWT.  
    **Body:** `{ email, password }`

### Posts

-   `GET /api/posts`  
    Get all posts.

-   `GET /api/posts/:id`  
    Get a post by ID.

-   `POST /api/posts`  
    Create a new post (requires JWT in `Authorization` header).  
    **Body:** `{ title, content, status }`

-   `PUT /api/posts/:id`  
    Update a post.

-   `DELETE /api/posts/:id`  
    Delete a post.

---

## Authentication

JWT-based authentication is used for protected routes.  
Include the token in the `Authorization` header as `Bearer <token>`.

Middleware: [`server/middleware/auth.js`](server/middleware/auth.js)

---

## Validation

Input validation is handled using [`express-validator`](https://express-validator.github.io/).  
See [`server/middleware/validation.js`](server/middleware/validation.js) for rules.

---

## Technologies Used

-   [Express](https://expressjs.com/)
-   [Prisma ORM](https://www.prisma.io/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [bcryptjs](https://www.npmjs.com/package/bcryptjs)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-   [express-validator](https://express-validator.github.io/)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [CORS](https://www.npmjs.com/package/cors)

---

## License

[ISC](LICENSE)

---

**Note:**  
For frontend integration, ensure CORS origins are set correctly in [`app.js`](app.js).
