import express from 'express';
import dotenv from 'dotenv';
import database from './utils/database.js';
import itemRoutes from './routes/item.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/items', itemRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running!', 
    timestamp: new Date().toISOString() 
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Backend Development Starter API',
    endpoints: {
      health: '/health',
      items: '/api/items'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server with database connection
const startServer = async () => {
  try {
    // Connect to MongoDB
    await database.connect();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API Base URL: http://localhost:${PORT}/api/items`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('\n Shutting down gracefully...');
//   try {
//     await database.disconnect();
//     console.log(' Server shutdown complete');
//     process.exit(0);
//   } catch (error) {
//     console.error(' Error during shutdown:', error.message);
//     process.exit(1);
//   }
// });

// Start the application
startServer();
