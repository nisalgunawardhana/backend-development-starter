import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

// Helper functions to read/write items from/to the JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../../data/data.json');

const readItems = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const writeItems = (list) =>
  fs.writeFileSync(dataPath, JSON.stringify(list, null, 2));
const getNextId = (list) =>
  list.reduce((max, item) => Math.max(max, item.id), 0) + 1;

router.get('/', (req, res) => {
  const items = readItems();
  res.json(items);
});

/* -------------------------------------------------------------------- */



//get all
router.get('/', (req, res) => {
  const items = readItems();
  res.json(items);
});

//get by id
router.get('/:id', (req, res) => {
  const items = readItems();
  const id = Number(req.params.id);
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }

  res.json(item);
});


//create new item
router.post('/', (req, res) => {
  const items = readItems();
  const newItem = { id: getNextId(items), ...req.body };
  items.push(newItem);
  writeItems(items);
  res.status(201).json(newItem);
});


//update item by id
router.put('/:id', (req, res) => {
  const items = readItems();
  const id = Number(req.params.id);
  const index = items.findIndex((entry) => entry.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }

  items[index] = { id, ...req.body };
  writeItems(items);
  res.json(items[index]);
});

//delete item by id
router.delete('/:id', (req, res) => {
  const items = readItems();
  const id = Number(req.params.id);
  const index = items.findIndex((entry) => entry.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }

  const [removed] = items.splice(index, 1);
  writeItems(items);
  res.json(removed);
});

export default router;
