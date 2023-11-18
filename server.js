//Dependencies
import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

//other imports
import AuthHandler from './middlewares/AuthHandler.js'
import { userTypeModel } from "./models/Users/UserTypes.js";

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

//routes
app.post('/merchant', AuthHandler, async (req, res) => {
    const id = req.user;
    const user = userTypeModel.create({userId: id, type: 'merchant'});
    res.status(200).json(user);
})

app.use('/api/', userTypesRouter);
app.use('/api/users', userRouter);
app.use('/api/workers', workerRouter);
app.use('/api/fooditems', itemsRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.json({ 'msg': "hello world!!" });
});


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