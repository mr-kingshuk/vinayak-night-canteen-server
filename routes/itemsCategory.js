import express from 'express';

const itemsRouter = express.Router();

import getCategories from '../controllers/ItemsCategory/getCategories.js';
import getItems from '../controllers/ItemsCategory/getItems.js';
import addCategory from '../controllers/ItemsCategory/addCategory.js';
import addItem from '../controllers/ItemsCategory/addItem.js';
import itemChange from '../controllers/ItemsCategory/itemChange.js';
import deleteCategory from '../controllers/ItemsCategory/deleteCategory.js';
import deleteItem from '../controllers/ItemsCategory/deleteItem.js';

import isMerchant from '../middlewares/isMerchant.js';
import isWorker from '../middlewares/isWorker.js';
import requireAuth from '../middlewares/AuthHandler.js';

// getItemsinCategories
itemsRouter.get('/category', requireAuth, getCategories);

//gets all Item
itemsRouter.get('/items', requireAuth, getItems);

//adds a category to db
itemsRouter.post('/category', isMerchant, addCategory);

//adds a item to db
itemsRouter.post('/item', isMerchant, addItem);

//item turn off/on, switches the existing state.
itemsRouter.post('/itemsChange/:id', isWorker, itemChange);

//delete a category
itemsRouter.delete('/category', isMerchant, deleteCategory);

//delete a item
itemsRouter.delete('/item', isMerchant, deleteItem);

export default itemsRouter;
