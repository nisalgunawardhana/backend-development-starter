import express from 'express';
import itemsRouter from './routes/item.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/items', itemsRouter);

app.get('/', (req, res) => {
  res.send('Item API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
