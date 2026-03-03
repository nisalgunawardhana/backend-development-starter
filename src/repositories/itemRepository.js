import fs from 'fs/promises';
import path from 'path';
import { Item } from '../models/item.js';

const dataPath = path.join(process.cwd(), 'data/data.json');

export class ItemRepository {
  static async getAll() {
    try {
      const rawData = await fs.readFile(dataPath, 'utf-8');
      const items = JSON.parse(rawData);
      return items.map(item => new Item(item.id, item.name, item.description));
    } catch (error) {
      throw new Error('Failed to fetch items');
    }
  }

  static async getById(id) {
    try {
      const items = await this.getAll();
      return items.find(item => item.id === id) || null;
    } catch (error) {
      throw new Error('Failed to fetch item by ID');
    }
  }

  static async create(data) {
    try {
      const items = await this.getAll();
      const newItem = new Item(items.length + 1, data.name, data.description);
      items.push(newItem);
      await fs.writeFile(dataPath, JSON.stringify(items, null, 2));
      return newItem;
    } catch (error) {
      throw new Error('Failed to create item');
    }
  }

  static async update(id, data) {
    try {
      const items = await this.getAll();
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex === -1) return null;

      const updatedItem = { ...items[itemIndex], ...data };
      items[itemIndex] = updatedItem;
      await fs.writeFile(dataPath, JSON.stringify(items, null, 2));
      return updatedItem;
    } catch (error) {
      throw new Error('Failed to update item');
    }
  }

  static async delete(id) {
    try {
      const items = await this.getAll();
      const filteredItems = items.filter(item => item.id !== id);
      if (filteredItems.length === items.length) return false;

      await fs.writeFile(dataPath, JSON.stringify(filteredItems, null, 2));
      return true;
    } catch (error) {
      throw new Error('Failed to delete item');
    }
  }
}