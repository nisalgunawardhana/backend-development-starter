import express from 'express';
import itemsRouter from './routes/item.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/items', itemsRouter);

app.get('/', (req, res) => {
  res.send('Item API');
});

// Centralized error handler to avoid leaking stack traces to clients
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
