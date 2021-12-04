require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const userRouter = require('./routes/userRoutes');
const { initialiseDb } = require('./utils/mongo');

const app = express();

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: 'GET,PUT,POST,DELETE'
    }
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/todo', todoRoutes);
app.use('/api/user', userRouter);

const port = 5000;

app.listen(port, () => {
    initialiseDb();
    console.log(`App listening at http://localhost:${port}`)
})