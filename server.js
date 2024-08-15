//Dependencies
import express, { urlencoded } from 'express';
import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

//other imports
import AuthHandler from './middlewares/AuthHandler.js'
import { userTypeModel } from "./models/Users/UserTypes.js";

//routers imports
import userRouter from './routes/users.js';
import workerRouter from './routes/worker.js';
import userTypesRouter from './routes/userTypes.js';
import itemsRouter from './routes/itemsCategory.js';
import orderRouter from './routes/orders.js';
import timingRouter from './routes/storeTiming.js';
import passwordRouter from './routes/password.js';

//enviroment variables and app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.BASE_URL_CLIENT,
        methods: ["GET", "POST"],
    }
});
const PORT = process.env.PORT;
const MONGO_URI_DEV = process.env.MONGO_URI_DEV;
const MONGO_URI_PROD = process.env.MONGO_URI_PROD;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Database connection URI based on environment
const MONGO_URI = NODE_ENV === 'production' ? MONGO_URI_PROD : MONGO_URI_DEV;

//middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes
//create a Merchant ID, by upgrading a regular user.
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
app.use('/api/timing', timingRouter);
app.use('/api/password', passwordRouter);

//get Razorpay API Key
app.get('/api/key', (req, res) => {
    res.status(200).json({ "key": process.env.RAZORPAY_ID_KEY });
});

app.get('/', (req, res) => {
    res.json({ 'msg': "hello world!!" });
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

//db connect
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //listen for requests
        httpServer.listen(PORT, () => {
            console.log(`Connected to DB & Server is running on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

export { io };    