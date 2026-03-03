import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data/data.json');
let rawData = fs.readFileSync(dataPath, 'utf-8');
let items = JSON.parse(rawData);

export class Item {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static getAll() {
    return items;
  }

  static getById(id) {
    return items.find(item => item.id === id);
  }

  static create(name, description) {
    const newItem = new Item(items.length + 1, name, description);
    items.push(newItem);
    fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
    return newItem;
  }

  static update(id, name, description) {
    const item = items.find(item => item.id === id);
    if (!item) return null;
    if (name) item.name = name;
    if (description) item.description = description;
    fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
    return item;
  }

  static delete(id) {
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
    return true;
  }
}

