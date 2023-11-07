import express from 'express';

import getItems from '../controllers/ItemsCategory/getItems.js';
import addCategory from '../controllers/ItemsCategory/addCategory.js';
import addItem from '../controllers/ItemsCategory/addItem.js';
import itemChange from '../controllers/ItemsCategory/itemChange.js';
import deleteCategory from '../controllers/ItemsCategory/deleteCategory.js';
import deleteItem from '../controllers/ItemsCategory/deleteItem.js';

import isMerchant from '../middlewares/isMerchant.js';
import isWorker from '../middlewares/isWorker.js';
import requireAuth from '../middlewares/AuthHandler.js';

const itemsRouter = express.Router();

// getItemsinCategories
itemsRouter.get('/', requireAuth, getItems);

//adds a category to db
itemsRouter.post('/category', isMerchant, addCategory);

//adds a item to db
itemsRouter.post('/item/:categoryId', isMerchant, addItem);

//delete a category
itemsRouter.delete('/category/:id', isMerchant, deleteCategory);

//delete a item
itemsRouter.delete('/item/:id', isMerchant, deleteItem);

//item turn off/on, switches the existing state.
itemsRouter.patch('/itemsChange/:id', isWorker, itemChange);

export default itemsRouter;
