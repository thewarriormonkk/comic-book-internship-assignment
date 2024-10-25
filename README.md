# Comic Book Management API

A RESTful API for managing comic books, built with Node.js, Express, and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- Express Async Handler

## Prerequisites

- Node.js
- MongoDB installed locally or MongoDB Atlas account
- npm

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd comic-book-management-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
DB_URI=mongodb://localhost:27017/comic-books
# Or use your MongoDB Atlas URI
```

4. **Start the server**

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Books

- `GET /api/books` - Get all books (with pagination, filtering, and sorting)
- `GET /api/books/:id` - Get single book details
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Query Parameters

- `page`: Page number for pagination (default: 1)
- `limit`: Items per page (default: 5)
- `author`: Filter by author
- `year`: Filter by publication year
- `price`: Filter by maximum price
- `condition`: Filter by book condition
- `sortBy`: Sort field and order (e.g., "price:desc")

## Example Request

```bash
# Get books with filters
GET /api/books?page=1&limit=10&author=author_name&sortBy=price:desc

# Create a new book
POST /api/books
Content-Type: application/json

{
  "name": "book_name",
  "author": "author_name",
  "publicationYear": 2016,
  "price": 29.99,
  "pages": 150,
  "condition": "new",
  "genre": "Superhero"
}
```

## License

ISC

## Author

Satendra
