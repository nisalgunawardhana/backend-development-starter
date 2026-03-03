import { Item } from '../models/item.js';

// Get all items
export const getAllItems = (req, res) => {
  //try-catch block to handle potential errors when fetching items  
  try {
    const items = Item.getAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single item by ID
export const getItemById = (req, res) => {
  try {
    const item = Item.getById(parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new item
export const createItem = (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
    const newItem = Item.create(name, description);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an item by ID
export const updateItem = (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedItem = Item.update(parseInt(req.params.id), name, description);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete an item by ID
export const deleteItem = (req, res) => {
  try {
    const deleted = Item.delete(parseInt(req.params.id));
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};