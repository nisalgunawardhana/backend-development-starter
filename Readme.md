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
