import express from 'express';
import prisma from './lib/prisma';
import roomTypeRoute from './routes/roomTypeRoute';
const port = 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/room-type', roomTypeRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));
