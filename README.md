# INF 222 - EC1 (Backend development): Web Programming

## Teacher: *Pr JIOMEKONG*
## Directed by:  *Charles Njiosseu, PhD Student*

# Blog API

API REST backend for managing blog articles.
Built with Node.js, Express and SQLite.

---

## Author

**[@esthera-tiago](https://github.com/esthera-tiago)** — Matricule : 24F2810


## Prerequisites

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm (included with Node.js)

---

## Installation

1. Clone the repository :
```bash
   git clone https://github.com/esthera-tiago/Info_222
   cd Info_222
```

2. Installing dependencies :
```bash
   npm install
```

3. Start the server :
```bash
   # Development mode (auto-restart on file changes)
   npm run dev

   # Production mode
   npm start
```

The server runs on **http://localhost:3000**

---

## API Documentation (Swagger)

Interactive documentation available at:
**http://localhost:3000/api-docs**

---

## Endpoints

### Articles

| Method | Endpoint                        | Description                        |
|--------|---------------------------------|------------------------------------|
| GET    | /api/articles                   | Retrieve all articles              |
| GET    | /api/articles?categorie=Tech    | Filter by category                 |
| GET    | /api/articles?auteur=Alice      | Filter by author                   |
| GET    | /api/articles?date=2026-03-23   | Filter by date                     |
| GET    | /api/articles/:id               | Retrieve a single article by ID    |
| GET    | /api/articles/search?query=text | Search in title and content        |
| POST   | /api/articles                   | Create a new article               |
| PUT    | /api/articles/:id               | Update an existing article         |
| DELETE | /api/articles/:id               | Delete an article                  |

---

## Usage Examples

### Create an article — `POST /api/articles`

**Request body:**
```json
{
  "title": "Introduction to Node.js",
  "content": "Node.js is a JavaScript runtime built on Chrome's V8 engine...",
  "author": "Tiago",
  "category": "Technology",
  "tags": ["nodejs", "javascript", "backend"]
}

**Response (201):**
```json
{
  "message": "Article created successfully",
  "article": {
    "id": 1,
    "title": "Introduction to Node.js",
    "content": "Node.js is a JavaScript runtime built on Chrome's V8 engine...",
    "author": "Tiago",
    "date": "2026-03-23",
    "category": "Technology",
    "tags": ["nodejs", "javascript", "backend"]
  }
}
```

---

### Retrieve all articles — `GET /api/articles`

**Response (200):**
```json
{
  "articles": [
    {
      "id": 1,
      "title": "Introduction to Node.js",
      "author": "Alice",
      "date": "2026-03-23",
      "category": "Technology",
      "tags": ["nodejs", "javascript", "backend"]
    }
  ]
}
```

---

### Retrieve a single article — `GET /api/articles/1`

**Response (200):**
```json
{
  "article": {
    "id": 1,
    "title": "Introduction to Node.js",
    "content": "Node.js is a JavaScript runtime built on Chrome's V8 engine...",
    "author": "Alice",
    "date": "2026-03-23",
    "category": "Technology",
    "tags": ["nodejs", "javascript", "backend"]
  }
}
```

**Response if ID not found (404):**
```json
{ "error": "Article not found" }
```

---

### Update an article — `PUT /api/articles/1`

**Request body (partial fields accepted):**
```json
{
  "title": "Introduction to Node.js — Updated",
  "tags": ["nodejs", "express"]
}
```

**Response (200):**
```json
{
  "message": "Article updated successfully",
  "article": { ... }
}
```

---

### Delete an article — `DELETE /api/articles/1`

**Response (200):**
```json
{ "message": "Article deleted successfully" }
```

---

### Search articles — `GET /api/articles/search?query=node`

**Response (200):**
```json
{
  "articles": [
    { "id": 1, "title": "Introduction to Node.js", ... }
  ]
}
```

---

## HTTP Status Codes

| Code | Meaning                                  |
|------|------------------------------------------|
| 200  | Success                                  |
| 201  | Resource created successfully            |
| 400  | Bad request (missing or invalid fields)  |
| 404  | Article not found                        |
| 500  | Internal server error                    |


---

## Project Structure
```
blog-api/
├── server.js                            # Entry point
├── src/
│   ├── db/database.js                # SQLite connection & table setup
│   ├── models/articleModel.js        # Database access layer
│   ├── controllers/
│   │   └── articlesController.js     # Business logic & validation
│   └── routes/
│       └── articles.js               # Endpoint definitions & Swagger docs
├── package.json
└── README.md
```

---