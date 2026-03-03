# Backend Development Starter

## Project Overview
This project demonstrates a backend application built using **Clean Architecture** principles with **MongoDB** integration. It provides CRUD (Create, Read, Update, Delete) operations for managing items, with proper error handling and standardized responses. This project is designed for beginners to understand modern backend development practices.

### Key Features:
- **Clean Architecture**: Separation of concerns into layers (Model, Repository, Service, Controller, Router).
- **MongoDB Integration**: NoSQL database for data persistence with proper connection management.
- **Error Handling**: Custom error classes and standardized error responses.
- **Async/Await**: All asynchronous operations are handled using `async/await`.
- **Environment Configuration**: Secure credential management using environment variables.
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

### 2. **Repository Layer** �️
**Purpose**: Handles all data access and persistence operations with MongoDB.

**Responsibilities**:
- Connect to MongoDB database
- Perform CRUD operations on MongoDB collections
- Convert between MongoDB documents and application models
- Handle MongoDB-specific operations (ObjectId, queries, etc.)

**Why it's important**: If you change from MongoDB to PostgreSQL, only this layer needs to change.

**File**: `src/repositories/itemRepository.js`

**Example**:
```javascript
export class ItemRepository {
  static async getAll() {
    const collection = database.getCollection('items');
    const items = await collection.find({}).toArray();
    return items.map(item => new Item(item._id.toString(), item.name, item.description));
  }
}
```

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
- `src/utils/database.js`: MongoDB connection and management

**Database Utility Example**:
```javascript
class Database {
  async connect() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    await this.client.connect();
    this.db = this.client.db(process.env.DB_NAME);
  }

  getCollection(name) {
    return this.getDb().collection(name);
  }
}
```

---

## MongoDB Integration 🍃

**What is MongoDB?**
MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents. It's perfect for applications that need to store and retrieve complex data structures.

**Why MongoDB?**
- **Flexible Schema**: No need to define rigid table structures
- **JSON-like Documents**: Natural fit for JavaScript applications
- **Scalable**: Handles large amounts of data efficiently
- **Developer Friendly**: Easy to learn and use

### MongoDB Setup Guide

**Option 1: Local MongoDB Installation**

1. **Install MongoDB**:
   ```bash
   # macOS (using Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Start MongoDB service
   brew services start mongodb-community
   
   # Windows: Download from https://www.mongodb.com/try/download/community
   # Linux: Follow instructions at https://docs.mongodb.com/manual/installation/
   ```

2. **Verify Installation**:
   ```bash
   mongosh  # Opens MongoDB shell
   ```

**Option 2: MongoDB Atlas (Cloud) - Recommended for Beginners**

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Follow the free tier setup
3. **Get Connection String**: Copy the connection string provided
4. **Whitelist IP**: Add your IP address to allow connections

### Environment Configuration

1. **Copy Environment File**:
   ```bash
   cp .env.sample .env
   ```

2. **Update .env File**:
   ```env
   # For Local MongoDB
   MONGODB_URI=mongodb://localhost:27017/backend_starter
   
   # For MongoDB Atlas
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/backend_starter
   
   DB_NAME=backend_starter
   PORT=3000
   ```

### How MongoDB Works in This Project

**Document Structure**:
```javascript
// MongoDB Document (what gets stored)
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Sample Item",
  description: "This is a sample item",
  createdAt: ISODate("2026-03-03T10:30:00Z"),
  updatedAt: ISODate("2026-03-03T10:30:00Z")
}

// Application Model (what your code uses)
class Item {
  constructor(id, name, description) {
    this.id = id;  // "507f1f77bcf86cd799439011"
    this.name = name;
    this.description = description;
  }
}
```

**CRUD Operations Explained**:

1. **Create**: Insert new document into `items` collection
2. **Read**: Find documents using queries (`find`, `findOne`)
3. **Update**: Modify existing documents using `updateOne`, `findOneAndUpdate`
4. **Delete**: Remove documents using `deleteOne`

**Connection Management**:
- **Singleton Pattern**: One database connection shared across the application
- **Error Handling**: Proper connection error handling and recovery
- **Graceful Shutdown**: Proper database disconnection on app termination

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

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (Local installation or Atlas account)

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nisalgunawardhana/backend-development-starter.git
   cd backend-development-starter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup MongoDB**:
   - **Option A**: Install MongoDB locally (see MongoDB Setup Guide above)
   - **Option B**: Create a free MongoDB Atlas cluster

4. **Configure Environment**:
   ```bash
   # Copy environment template
   cp .env.sample .env
   
   # Edit .env with your MongoDB connection details
   # Update MONGODB_URI with your connection string
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Test the API**:
   ```bash
   # The server will start on http://localhost:3000
   # Test with tools like Postman or curl
   
   curl http://localhost:3000/api/items
   ```

### 🧪 API Testing with Postman

**Quick Setup**:
1. **Import Collection**: Import `postman/Backend_Development_Starter_API.postman_collection.json`
2. **Import Environment**: Import `postman/Backend_Starter_Development.postman_environment.json`
3. **Select Environment**: Choose "Backend Starter - Development" in Postman
4. **Start Testing**: Run requests in the recommended order

**Available Test Requests**:
- ✅ Health Check (`GET /health`)
- 📋 Get All Items (`GET /api/items`)
- 🔍 Get Item by ID (`GET /api/items/:id`)
- ➕ Create Item (`POST /api/items`)
- ✏️ Update Item (`PUT /api/items/:id`)
- 🗑️ Delete Item (`DELETE /api/items/:id`)

**See detailed Postman guide**: [`postman/README.md`](postman/README.md)

### Troubleshooting

**Common Issues**:

1. **MongoDB Connection Failed**:
   - Check if MongoDB is running locally
   - Verify MONGODB_URI in .env file
   - For Atlas: Check network access settings

2. **Port Already in Use**:
   - Change PORT in .env file
   - Kill process using the port: `lsof -ti:3000 | xargs kill`

3. **Environment Variables Not Loaded**:
   - Ensure .env file exists in project root
   - Check for typos in environment variable names

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

## Example Data Structure

The application stores data in MongoDB collections. Here's what the data looks like:

**MongoDB Document (stored in database)**:
```json
{
  "_id": "6580a1b2c3d4e5f6a7b8c9d0",
  "name": "Sample Item",
  "description": "This is a sample item for demonstration",
  "createdAt": "2026-03-03T10:30:00.000Z",
  "updatedAt": "2026-03-03T10:30:00.000Z"
}
```

**API Response (what clients receive)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "6580a1b2c3d4e5f6a7b8c9d0",
      "name": "Sample Item",
      "description": "This is a sample item for demonstration"
    }
  ]
}
```

**Key Differences from JSON File Approach**:
- **IDs**: MongoDB uses ObjectId (24-character hex string) instead of incrementing numbers
- **Timestamps**: Automatic `createdAt` and `updatedAt` fields
- **Validation**: Built-in MongoDB schema validation
- **Scalability**: Can handle millions of documents efficiently

---

## Conclusion
This project demonstrates the importance of structuring backend applications using Clean Architecture principles. By following these practices, the application is easier to maintain, debug, and extend in the future.
