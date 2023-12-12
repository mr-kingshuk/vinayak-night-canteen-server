//Dependencies
import express, { urlencoded } from 'express';
import dotenv from "dotenv";
dotenv.config();
import cron from 'node-cron';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

//other imports
import AuthHandler from './middlewares/AuthHandler.js'
import { userTypeModel } from "./models/Users/UserTypes.js";
import increment from './models/Orders/Increment.js';
import { counter } from './models/Orders/Counter.js';
import { itemModel } from './models/FoodItems/FoodItem.js'

//routers imports
import userRouter from './routes/users.js';
import workerRouter from './routes/worker.js';
import userTypesRouter from './routes/userTypes.js';
import itemsRouter from './routes/itemsCategory.js';
import orderRouter from './routes/orders.js';

//enviroment variables and app
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : true}));

//routes
app.post('/merchant', AuthHandler, async (req, res) => {
    const id = req.user;
    const user = userTypeModel.create({ userId: id, type: 'merchant' });
    res.status(200).json(user);
})

app.use('/api/', userTypesRouter);
app.use('/api/users', userRouter);
app.use('/api/workers', workerRouter);
app.use('/api/fooditems', itemsRouter);
app.use('/api/orders', orderRouter);

//get Razorpay API Key
app.get('/api/key', (req, res) => {
    res.status(200).json({"key": process.env.RAZORPAY_ID_KEY});
})

app.get('/', (req, res) => {
    res.json({ 'msg': "hello world!!" });
});

const functionAt11 = async () => {
    try{
        const result = await itemModel.updateMany({}, { $set: { isAvailable: true } });
    }
    catch(err){
        console.log(err);
    }
};

const functionAt2 = async () => {
    try{
        const orderNumber = await counter.reset();
        const result = await itemModel.updateMany({}, { $set: { isAvailable: false } });
        console.log(result);
        console.log(orderNumber);
    }
    catch(err){
        console.log(err);
    }
};

// Schedule the functions
cron.schedule('46 13 * * *', functionAt11, { timezone: 'Asia/Kolkata' }); // 11 PM IST
cron.schedule('44 13 * * *', functionAt2, { timezone: 'Asia/Kolkata' }); // 2 AM IST


//db connect
mongoose.connect(MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(PORT, () => {
            console.log(`Connected to DB & Server is running on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });