import express from 'express';

//controllers
import addOrder from '../controllers/Orders/addOrder.js';
import getOrder from '../controllers/Orders/getOrder.js';
import getOrders from '../controllers/Orders/getOrders.js';
import getReceivedOrders from '../controllers/Orders/getReceivedOrders.js';
import cancelOrder from '../controllers/Orders/cancelOrder.js';
import deliverOrder from '../controllers/Orders/deliverOrder.js';
import getCancelledOrders from '../controllers/Orders/getCancelledOrders.js';
import getDeliveredOrders from '../controllers/Orders/getDeliveredOrders.js';
import paymentVerify from '../controllers/Orders/paymentVerify.js';

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

//signify the order as cancelled
orderRouter.patch('/cancel/:id', isWorker, cancelOrder);

//signify the order as delivered
orderRouter.patch('/deliver/:id', isWorker, deliverOrder);

//get all deleted orders
orderRouter.get('/cancel', isMerchant, getCancelledOrders);

//get all delivered orders
orderRouter.get('/deliver', isMerchant, getDeliveredOrders);

//verify payment
orderRouter.post('/verification', paymentVerify);

export default orderRouter;