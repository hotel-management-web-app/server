import express from 'express';
import { errorHandler } from './middleware/errorMiddleware';
import roomTypeRoute from './routes/roomTypeRoute';
const port = 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/room-types', roomTypeRoute);

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));
