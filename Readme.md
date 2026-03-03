# Backend Development Starter

A comprehensive learning repository demonstrating progressive backend development concepts using Node.js and Express. This repository is structured as a series of lesson branches, each building upon the previous to teach fundamental backend development patterns, from basic server setup to clean architecture with database integration.

## Learning Path Overview

This repository contains 6 branches that progressively teach backend development concepts:

| Branch | Concept | Key Learning Points |
|--------|---------|-------------------|
| `main` | Project Foundation | Basic project structure and Git workflow |
| `lesson/01-basic-server` | Express Fundamentals | Server setup, routing basics, ES modules |
| `lesson/02-crud-in-memory` | CRUD Operations | REST API design, file-based data persistence |
| `lesson/03-crud-error-handling` | Error Management | MVC pattern, structured error handling |
| `lesson/04-clean-architecture` | Code Organization | Service layer, repository pattern, separation of concerns |
| `lesson/05-database-integration` | Database Integration | MongoDB integration, environment configuration |

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git version control
- MongoDB (for lesson 5) - Local installation or MongoDB Atlas account
- REST API client (Postman, Insomnia, or similar)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/nisalgunawardhana/backend-development-starter.git
cd backend-development-starter
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Choose Your Learning Path
Navigate between lessons using Git branches:

```bash
# List all available branches
git branch -a

# Switch to a specific lesson
git checkout lesson/01-basic-server

# Install dependencies for the current lesson
npm install

# Run the server
npm run dev
```

## Branch Descriptions

### `main` Branch
**Purpose**: Project foundation and setup
- Basic project structure
- Package.json configuration
- Git ignore configuration
- Environment file templates

**What You'll Learn**:
- Project initialization best practices
- Environment variable management
- Git workflow for feature branches

### `lesson/01-basic-server`
**Purpose**: Introduction to Express.js server basics
- Simple Express server setup
- Basic routing with GET endpoint
- ES6 modules implementation
- Server port configuration

**Key Files**:
- `src/index.js` - Main server file with Hello World endpoint

**What You'll Learn**:
- Express.js fundamentals
- ES6 module syntax (import/export)
- Basic server configuration
- HTTP request/response handling

**Run the Server**:
```bash
git checkout lesson/01-basic-server
npm install
npm run dev
# Visit: http://localhost:3000
```

### `lesson/02-crud-in-memory`
**Purpose**: Implementing complete CRUD operations with file-based persistence
- RESTful API design patterns
- JSON file data persistence
- Route organization and modularization
- HTTP methods and status codes

**Key Files**:
- `src/routes/item.js` - Item CRUD routes
- `data/data.json` - Sample data storage

**What You'll Learn**:
- REST API conventions (GET, POST, PUT, DELETE)
- File system operations for data persistence
- Route modularization and organization
- HTTP status codes usage
- Request parameter handling

**API Endpoints**:
- `GET /items` - List all items
- `GET /items/:id` - Get item by ID
- `POST /items` - Create new item
- `PUT /items/:id` - Update item
- `DELETE /items/:id` - Delete item

**Run and Test**:
```bash
git checkout lesson/02-crud-in-memory
npm install
npm run dev
# Test endpoints with your REST client
```

### `lesson/03-crud-error-handling`
**Purpose**: Implementing proper error handling and MVC architecture
- Controller layer implementation
- Model layer with class-based structure
- Comprehensive error handling with try-catch blocks
- Input validation and proper HTTP responses

**Key Files**:
- `src/controllers/itemController.js` - Business logic controllers
- `src/models/item.js` - Data model with CRUD methods
- Updated route handlers with proper error responses

**What You'll Learn**:
- MVC (Model-View-Controller) architecture pattern
- Error handling best practices
- Input validation techniques
- Proper HTTP response structure
- Code organization and separation of concerns

**Architecture Pattern**:
- **Routes**: Handle HTTP requests and delegate to controllers
- **Controllers**: Contain business logic and error handling
- **Models**: Manage data operations and persistence

**Run and Test**:
```bash
git checkout lesson/03-crud-error-handling
npm install
npm run dev
# Test error scenarios: invalid IDs, missing fields, etc.
```

### `lesson/04-clean-architecture`
**Purpose**: Implementing clean architecture principles
- Service layer for business logic
- Repository pattern for data access
- Utility functions for common operations
- Enhanced error handling with custom error classes
- Response standardization

**Key Files**:
- `src/services/itemService.js` - Business logic layer
- `src/repositories/itemRepository.js` - Data access layer
- `src/utils/errors.js` - Custom error classes
- `src/utils/responseHandler.js` - Standardized responses

**What You'll Learn**:
- Clean Architecture principles
- Repository pattern implementation
- Service layer design
- Custom error handling strategies
- Code reusability and maintainability
- Dependency injection concepts

**Architecture Layers**:
1. **Routes**: HTTP interface
2. **Controllers**: Request/response handling
3. **Services**: Business logic
4. **Repositories**: Data access
5. **Models**: Data structures
6. **Utils**: Shared utilities

**Run and Test**:
```bash
git checkout lesson/04-clean-architecture
npm install
npm run dev
# Notice improved error messages and response consistency
```

### `lesson/05-database-integration`
**Purpose**: Integrating MongoDB database with environment configuration
- MongoDB connection and operations
- Environment-based configuration
- Database error handling
- Production-ready setup with connection pooling
- API testing collection

**Key Files**:
- Updated repositories with MongoDB operations
- `.env.sample` - Environment configuration template
- `postman/Backend_Development_Starter_API.postman_collection.json` - API testing collection

**What You'll Learn**:
- MongoDB integration with Node.js
- Environment variable management
- Database connection handling
- Production deployment considerations
- API documentation and testing

**Setup Requirements**:
1. **MongoDB Setup** (choose one):
   - Local MongoDB installation
   - MongoDB Atlas cloud database
   - Docker MongoDB container

2. **Environment Configuration**:
   ```bash
   cp .env.sample .env
   # Edit .env with your MongoDB connection string
   ```

3. **Database Connection Examples**:
   ```env
   # Local MongoDB
   MONGODB_URI=mongodb://localhost:27017/backend_starter
   
   # MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/backend_starter
   ```

**Run and Test**:
```bash
git checkout lesson/05-database-integration
npm install
cp .env.sample .env
# Configure your .env file with MongoDB URI
npm run dev
# Import Postman collection for comprehensive API testing
```

## Navigation Commands

### Branch Management
```bash
# View all branches
git branch -a

# Switch to specific lesson
git checkout lesson/01-basic-server
git checkout lesson/02-crud-in-memory
git checkout lesson/03-crud-error-handling
git checkout lesson/04-clean-architecture
git checkout lesson/05-database-integration

# Return to main branch
git checkout main

# View commit history and changes
git log --oneline --graph
```

### Development Workflow
```bash
# Install dependencies (run after switching branches)
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# View package.json contents
cat package.json
```

## Testing Your Progress

### API Testing Checklist
For each lesson branch, test these scenarios:

**Basic Functionality**:
- [ ] Server starts without errors
- [ ] GET /items returns list of items
- [ ] GET /items/:id returns specific item
- [ ] POST /items creates new item
- [ ] PUT /items/:id updates existing item
- [ ] DELETE /items/:id removes item

**Error Handling** (lessons 3-5):
- [ ] GET /items/999 returns 404 for non-existent item
- [ ] POST /items with missing fields returns 400
- [ ] PUT /items/999 returns 404 for non-existent item
- [ ] DELETE /items/999 returns 404 for non-existent item

**Advanced Features** (lesson 5):
- [ ] Database connection established successfully
- [ ] Data persists between server restarts
- [ ] Environment variables loaded correctly

## Best Practices Demonstrated

### Code Organization
- Separation of concerns with layered architecture
- Modular file structure
- Consistent naming conventions
- Proper error handling at each layer

### API Design
- RESTful endpoint design
- Appropriate HTTP methods and status codes
- Consistent request/response formats
- Proper error response structure

### Database Integration
- Environment-based configuration
- Connection handling and error management
- Data model consistency
- Production-ready setup patterns

## Common Issues and Solutions

### Port Already in Use
```bash
# Find process using port 3000
lsof -ti:3000
# Kill the process
kill -9 $(lsof -ti:3000)
```

### MongoDB Connection Issues
- Verify MongoDB service is running
- Check connection string format
- Ensure database user permissions
- Verify network connectivity for Atlas

### Package Installation Issues
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Learning Objectives

By completing all lessons, you will understand:

1. **Express.js Fundamentals**: Server setup, routing, middleware
2. **REST API Design**: HTTP methods, status codes, endpoint structure
3. **MVC Architecture**: Separation of concerns, code organization
4. **Error Handling**: Try-catch blocks, custom errors, proper responses
5. **Clean Architecture**: Layered design, repository pattern, services
6. **Database Integration**: MongoDB operations, connection management
7. **Environment Management**: Configuration, security best practices
8. **Testing and Documentation**: API testing, collection management

## Next Steps

After completing this learning path, consider exploring:

- Authentication and authorization (JWT, OAuth)
- Advanced database operations (aggregation, indexing)
- API documentation (Swagger/OpenAPI)
- Testing frameworks (Jest, Mocha)
- Deployment strategies (Docker, cloud platforms)
- Performance optimization and caching
- Microservices architecture patterns

## Contributing

This is a learning repository. If you find issues or have suggestions for improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with detailed description

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Support

For questions or issues:
- Check the commit history for implementation details
- Review the code comments and documentation
- Test with the provided Postman collection
- Refer to the official Express.js and MongoDB documentation
