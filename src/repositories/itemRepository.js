import { ObjectId } from 'mongodb';
import database from '../utils/database.js';
import { Item } from '../models/item.js';

export class ItemRepository {
  static getCollection() {
    return database.getCollection('items');
  }

  static async getAll() {
    try {
      const collection = this.getCollection();
      const items = await collection.find({}).toArray();
      return items.map(item => new Item(item._id.toString(), item.name, item.description));
    } catch (error) {
      throw new Error('Failed to fetch items');
    }
  }

  static async getById(id) {
    try {
      const collection = this.getCollection();
      const objectId = new ObjectId(id);
      const item = await collection.findOne({ _id: objectId });
      
      if (!item) return null;
      return new Item(item._id.toString(), item.name, item.description);
    } catch (error) {
      throw new Error('Failed to fetch item by ID');
    }
  }

  static async create(data) {
    try {
      const collection = this.getCollection();
      const newItem = {
        name: data.name,
        description: data.description,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await collection.insertOne(newItem);
      return new Item(result.insertedId.toString(), newItem.name, newItem.description);
    } catch (error) {
      throw new Error('Failed to create item');
    }
  }

  static async update(id, data) {
    try {
      const collection = this.getCollection();
      const objectId = new ObjectId(id);
      
      const updateData = {
        ...data,
        updatedAt: new Date()
      };
      
      const result = await collection.findOneAndUpdate(
        { _id: objectId },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      
      if (!result.value) return null;
      return new Item(result.value._id.toString(), result.value.name, result.value.description);
    } catch (error) {
      throw new Error('Failed to update item');
    }
  }

  static async delete(id) {
    try {
      const collection = this.getCollection();
      const objectId = new ObjectId(id);
      
      const result = await collection.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error('Failed to delete item');
    }
  }
}