import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/users.js';
import booksRouter from './routes/books.js';
import cartsRouter from './routes/carts.js';
import ordersRouter from './routes/orders.js';
import likesRouter from './routes/likes.js';

dotenv.config()
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users', userRouter);
app.use('/likes', likesRouter);
app.use('/books', booksRouter);
app.use('/carts', cartsRouter);
app.use('/orders', ordersRouter);
