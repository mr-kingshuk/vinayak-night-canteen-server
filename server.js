//Dependencies
import express from 'express';
import dotenv  from "dotenv";
dotenv.config();
import morgan from 'morgan';

//routers imports


//enviroment variables and app
const app = express();
const PORT = process.env.PORT;

//routes
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.json({'msg': "hello world!!"});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})