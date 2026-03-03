# Backend Development Starter

## Project Overview
This project demonstrates a backend application built using **Clean Architecture** principles. It provides CRUD (Create, Read, Update, Delete) operations for managing items, with proper error handling and standardized responses. This project is designed for beginners to understand modern backend development practices.

### Key Features:
- **Clean Architecture**: Separation of concerns into layers (Model, Repository, Service, Controller, Router).
- **Error Handling**: Custom error classes and standardized error responses.
- **Async/Await**: All asynchronous operations are handled using `async/await`.
- **Data Persistence**: Data is stored in a `data.json` file and managed through the repository layer.
- **Beginner Friendly**: Clear separation of responsibilities and best practices.

---

## Clean Architecture Explained

Clean Architecture is a software design philosophy that emphasizes **separation of concerns**. It organizes code into layers, where each layer has a specific responsibility and depends only on the layers below it.

### Benefits:
- **Maintainability**: Easy to modify and extend
- **Testability**: Each layer can be tested independently
- **Scalability**: Easy to add new features without affecting existing code
- **Independence**: Business logic is independent of frameworks and databases

---

## Architecture Layers

### 1. **Model Layer** 📊
**Purpose**: Defines the structure and validation of data entities.

**Responsibilities**:
- Define data structure (what an `Item` looks like)
- Validate data integrity (ensure required fields are present)
- Map data between different representations

**Why it's important**: The model ensures data consistency and validity throughout the application.

**File**: `src/models/item.js`

**Example**:
```javascript
export class Item {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  validate() {
    if (!this.name || !this.description) {
      throw new Error('Name and description are required');
    }
  }
}
```

### 2. **Repository Layer** 💾
**Purpose**: Handles all data access and persistence operations.

**Responsibilities**:
- Read data from storage (`data.json`)
- Write data to storage
- Provide CRUD operations interface
- Handle data conversion between storage format and application format

**Why it's important**: If you change from JSON file to database, only this layer needs to change.

**File**: `src/repositories/itemRepository.js`

### 3. **Service Layer** ⚙️
**Purpose**: Contains business logic and coordinates between repository and controller.

**Responsibilities**:
- Implement business rules
- Validate data using models
- Coordinate repository operations
- Handle business-specific error cases

**Why it's important**: All your business logic stays in one place, making it easy to modify rules.

**File**: `src/services/itemService.js`

### 4. **Controller Layer** 🎮
**Purpose**: Handles HTTP requests and responses.

**Responsibilities**:
- Receive HTTP requests
- Extract data from request
- Call appropriate service methods
- Format and send HTTP responses
- Handle HTTP-specific errors

**Why it's important**: Separates web concerns from business logic.

**File**: `src/controllers/itemController.js`

### 5. **Router Layer** 🛤️
**Purpose**: Maps URL endpoints to controller functions.

**Responsibilities**:
- Define API endpoints (GET, POST, PUT, DELETE)
- Map URLs to controller functions
- Handle route parameters

**Why it's important**: Provides a clean interface for your API.

**File**: `src/routes/item.js`

### 6. **Utilities** 🔧
**Purpose**: Provide reusable helper functions.

**Files**:
- `src/utils/errors.js`: Custom error classes
- `src/utils/responseHandler.js`: Standardized API responses

---

## Async/Await Explained

**What is Async/Await?**
Async/await is a modern JavaScript feature for handling asynchronous operations (operations that take time, like reading files or making API calls).

**Why use Async/Await?**
- **Readability**: Code looks like synchronous code but handles asynchronous operations
- **Error Handling**: Easy to use try-catch blocks
- **Avoid Callback Hell**: No nested callbacks

**How it works in this project**:

1. **File Operations**: Reading/writing to `data.json`
```javascript
// Instead of callbacks:
fs.readFile('data.json', (err, data) => {
  if (err) throw err;
  // process data
});

// We use async/await:
const data = await fs.readFile('data.json', 'utf-8');
```

2. **Service Operations**: All service methods are async
```javascript
export async function getAllItems(req, res) {
  const items = await ItemService.getAllItems(); // Wait for data
}
```

**Key Points**:
- `async` functions always return a Promise
- `await` can only be used inside `async` functions
- `await` pauses execution until the Promise resolves
- Always use try-catch with async/await

---

## Error Handling Strategy

Proper error handling ensures your application is robust and provides meaningful feedback to users.

### 1. **Custom Error Classes** 🚨

**Purpose**: Create specific error types for different scenarios.

```javascript
// src/utils/errors.js
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}
```

**Types**:
- `NotFoundError`: When a resource doesn't exist
- `ValidationError`: When input data is invalid
- `InternalServerError`: When something unexpected happens

### 2. **Error Handling Flow** 📊

```
Controller → Service → Repository
    ↓         ↓         ↓
 Try-Catch → Custom → File System
           Errors    Errors
```

### 3. **Standardized Responses** 📤

**Success Response**:
```javascript
{
  "success": true,
  "data": [items]
}
```

**Error Response**:
```javascript
{
  "success": false,
  "message": "Item not found"
}
```

### 4. **Try-Catch Implementation** ⚡

**At Every Layer**:
```javascript
// Controller Layer
export async function getItemById(req, res) {
  try {
    const item = await ItemService.getItemById(id);
    successResponse(res, item);
  } catch (error) {
    errorResponse(res, error, 404);
  }
}

// Service Layer
static async getItemById(id) {
  const item = await ItemRepository.getById(id);
  if (!item) {
    throw new NotFoundError('Item not found');
  }
  return item;
}
```

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
This project demonstrates the importance of structuring backend applications using Clean Architecture principles. By following these practices, the application is easier to maintain, debug, and extend in the future.
