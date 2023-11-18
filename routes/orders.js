import express from 'express';

//controllers
import addOrder from '../controllers/Orders/addOrder.js';
import getOrder from '../controllers/Orders/getOrder.js';
import getOrders from '../controllers/Orders/getOrders.js';
import getReceivedOrders from '../controllers/Orders/getReceivedOrders.js';
import deleteOrder from '../controllers/Orders/deleteOrder.js';
import deliverOrder from '../controllers/Orders/deliverOrder.js';
import getDeletedOrders from '../controllers/Orders/getDeletedOrders.js';
import getDeliveredOrders from '../controllers/Orders/getDeliveredOrders.js';

//middlewares
import requireAuth from '../middlewares/AuthHandler.js';
import isMerchant from '../middlewares/isMerchant.js';
import isWorker from '../middlewares/isWorker.js';

const orderRouter = express.Router();

//adds order to database
orderRouter.post('/', requireAuth, addOrder);

//get Individual order details
orderRouter.get('/order/:id', requireAuth, getOrder);

//get all the orders of a particular user
orderRouter.get('/orders', requireAuth, getOrders);

//get all the received order in Worker Side
orderRouter.get('/receivedOrder', isWorker, getReceivedOrders);

//signify the order as deleted
orderRouter.patch('/delete/:id', isWorker, deleteOrder);

//signify the order as delivered
orderRouter.patch('/deliver/:id', isWorker, deliverOrder);

//get all deleted orders
orderRouter.get('/delete', isMerchant, getDeletedOrders);

//get all delivered orders
orderRouter.get('/deliver', isMerchant, getDeliveredOrders);

export default orderRouter;