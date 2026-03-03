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

  validate() {
    if (!this.name || !this.description) {
      throw new Error('Name and description are required');
    }
  }
}

