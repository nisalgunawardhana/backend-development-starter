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

