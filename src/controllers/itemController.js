import ItemService from '../services/itemService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

// Get all items
export async function getAllItems(req, res) {
  try {
    const items = await ItemService.getAllItems();
    successResponse(res, items);
  } catch (error) {
    errorResponse(res, error);
  }
}

// Get a single item by ID
export async function getItemById(req, res) {
  try {
    const item = await ItemService.getItemById(parseInt(req.params.id));
    successResponse(res, item);
  } catch (error) {
    if (error instanceof NotFoundError) {
      errorResponse(res, error, 404);
    } else {
      errorResponse(res, error);
    }
  }
}

// Create a new item
export async function createItem(req, res) {
  try {
    const newItem = await ItemService.createItem(req.body);
    successResponse(res, newItem, 201);
  } catch (error) {
    if (error instanceof ValidationError) {
      errorResponse(res, error, 400);
    } else {
      errorResponse(res, error);
    }
  }
}

// Update an item by ID
export async function updateItem(req, res) {
  try {
    const updatedItem = await ItemService.updateItem(parseInt(req.params.id), req.body);
    successResponse(res, updatedItem);
  } catch (error) {
    if (error instanceof NotFoundError) {
      errorResponse(res, error, 404);
    } else {
      errorResponse(res, error);
    }
  }
}

// Delete an item by ID
export async function deleteItem(req, res) {
  try {
    await ItemService.deleteItem(parseInt(req.params.id));
    successResponse(res, null, 204);
  } catch (error) {
    if (error instanceof NotFoundError) {
      errorResponse(res, error, 404);
    } else {
      errorResponse(res, error);
    }
  }
}