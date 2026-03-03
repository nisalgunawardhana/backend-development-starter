import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

class HttpError extends Error {
  constructor(status, message, cause) {
    super(message);
    this.status = status;
    this.cause = cause;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../../data/data.json');

const readItems = () => {
  const file = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(file);
};

const writeItems = (list) =>
  fs.writeFileSync(dataPath, JSON.stringify(list, null, 2));

const getNextId = (list) =>
  list.reduce((max, item) => Math.max(max, item.id), 0) + 1;

const parseId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw new HttpError(400, 'Invalid item id');
  }
  return id;
};

const sendError = (res, error, fallbackStatus = 500) => {
  const status = error instanceof HttpError ? error.status : fallbackStatus;
  const message =
    error instanceof HttpError ? error.message : 'Internal Server Error';
  console.error(error);
  res.status(status).json({ message });
};

// GET /items
router.get('/', (req, res) => {
  try {
    const items = readItems();
    res.json(items);
  } catch (error) {
    sendError(res, error);
  }
});

// GET /items/:id
router.get('/:id', (req, res) => {
  try {
    const items = readItems();
    const id = parseId(req.params.id);
    const item = items.find((entry) => entry.id === id);

    if (!item) {
      throw new HttpError(404, 'Item not found');
    }

    res.json(item);
  } catch (error) {
    sendError(res, error, 400);
  }
});

// POST /items
router.post('/', (req, res) => {
  try {
    const items = readItems();
    const newItem = { id: getNextId(items), ...req.body };
    items.push(newItem);
    writeItems(items);
    res.status(201).json(newItem);
  } catch (error) {
    sendError(res, error);
  }
});

// PUT /items/:id
router.put('/:id', (req, res) => {
  try {
    const items = readItems();
    const id = parseId(req.params.id);
    const index = items.findIndex((entry) => entry.id === id);

    if (index === -1) {
      throw new HttpError(404, 'Item not found');
    }

    items[index] = { id, ...req.body };
    writeItems(items);
    res.json(items[index]);
  } catch (error) {
    sendError(res, error, 400);
  }
});

// DELETE /items/:id
router.delete('/:id', (req, res) => {
  try {
    const items = readItems();
    const id = parseId(req.params.id);
    const index = items.findIndex((entry) => entry.id === id);

    if (index === -1) {
      throw new HttpError(404, 'Item not found');
    }

    const [removed] = items.splice(index, 1);
    writeItems(items);
    res.json(removed);
  } catch (error) {
    sendError(res, error, 400);
  }
});

export default router;
