# Backend Development Starter

## Project Overview
This project demonstrates a simple backend application built using the **MVC (Model-View-Controller)** architecture. It provides CRUD (Create, Read, Update, Delete) operations for managing items, with proper error handling and status codes.

### Key Features:
- **MVC Architecture**: Separation of concerns between data (Model), logic (Controller), and interface (Routes).
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes.
- **Data Persistence**: Data is stored in a `data.json` file and managed through the `Item` model.

---

## Architecture

### 1. **Model**
The `Item` model is responsible for:
- Mapping data from `data.json`.
- Performing CRUD operations (Create, Read, Update, Delete).
- Ensuring data persistence by reading from and writing to `data.json`.

File: `src/models/item.js`

### 2. **Controller**
The controller handles the application logic. It:
- Interacts with the `Item` model to fetch or manipulate data.
- Handles HTTP requests and sends appropriate responses.
- Implements error handling to ensure the application behaves predictably.

File: `src/controllers/itemController.js`

### 3. **Routes**
The routes act as the interface (view) of the application. They:
- Map API endpoints to the corresponding controller functions.
- Define the structure of the API.

File: `src/routes/item.js`

---

## Error Handling
Proper error handling is implemented to ensure the application is robust and user-friendly. Key aspects include:

1. **Try-Catch Blocks**:
   - All controller functions are wrapped in `try-catch` blocks to handle runtime errors gracefully.

2. **HTTP Status Codes**:
   - `200 OK`: Successful requests.
   - `201 Created`: Resource successfully created.
   - `204 No Content`: Resource successfully deleted.
   - `400 Bad Request`: Missing or invalid input.
   - `404 Not Found`: Resource not found.
   - `500 Internal Server Error`: Unexpected server errors.

3. **Error Messages**:
   - Clear and descriptive error messages are returned to the client to indicate what went wrong.

---

## Why Error Handling is Important
- **User Experience**: Prevents the application from crashing and provides meaningful feedback to users.
- **Debugging**: Helps developers identify and fix issues quickly.
- **Security**: Prevents sensitive information from being exposed in error responses.
- **Reliability**: Ensures the application behaves predictably even in unexpected scenarios.

---

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/nisalgunawardhana/backend-development-starter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd backend-development-starter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Base URL: `/api/items`

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | `/`            | Get all items            |
| GET    | `/:id`         | Get an item by ID        |
| POST   | `/`            | Create a new item        |
| PUT    | `/:id`         | Update an item by ID     |
| DELETE | `/:id`         | Delete an item by ID     |

---

## Example Data
The application uses `data.json` to store item data. Example:
```json
[
  { "id": 1, "name": "Sample Item", "description": "First example item" },
  { "id": 2, "name": "Second Item", "description": "Another example item" }
]
```

---

## Conclusion
This project demonstrates the importance of structuring backend applications using the MVC architecture and implementing proper error handling. By following these principles, the application is easier to maintain, debug, and extend in the future.
