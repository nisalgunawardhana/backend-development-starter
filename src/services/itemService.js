import { ItemRepository } from '../repositories/itemRepository.js';
import { Item } from '../models/item.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

export default class ItemService {
  static async getAllItems() {
    return await ItemRepository.getAll();
  }

  static async getItemById(id) {
    const item = await ItemRepository.getById(id);
    if (!item) {
      throw new NotFoundError('Item not found');
    }
    return item;
  }

  static async createItem(data) {
    try {
      const newItem = new Item(null, data.name, data.description);
      newItem.validate();
      return await ItemRepository.create(data);
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }

  static async updateItem(id, data) {
    const updatedItem = await ItemRepository.update(id, data);
    if (!updatedItem) {
      throw new NotFoundError('Item not found');
    }
    return updatedItem;
  }

  static async deleteItem(id) {
    const deleted = await ItemRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError('Item not found');
    }
    return deleted;
  }
}