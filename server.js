//Dependencies
import express from 'express';
import dotenv  from "dotenv";
dotenv.config();
import morgan from 'morgan';

//routers imports
import { router as UserRoutes } from './routes/users';

//enviroment variables and app
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(morgan('tiny'));

//routes
app.use('/api/users', UserRoutes);

app.get('/', (req, res) => {
    res.json({'msg': "hello world!!"});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})