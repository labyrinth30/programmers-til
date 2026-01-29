import express from 'express';
import userRouter from './routes/users.js';
import channelRouter from './routes/channels.js';

const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.use('/', userRouter);
app.use('/channels', channelRouter);
