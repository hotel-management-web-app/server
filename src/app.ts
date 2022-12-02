import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorMiddleware';
import roomTypeRoute from './routes/roomTypeRoute';
import roomRoute from './routes/roomRoute';
import guestRoute from './routes/guestRoute';
import bookingRoute from './routes/bookingRoute';
import aboutInfoRoute from './routes/aboutInfoRoute';
import aboutDetailRoute from './routes/aboutDetailRoute';
import generalSettingsRoute from './routes/generalSettingsRoute';
import profileInfoRoute from './routes/profileInfoRoute';
import { port } from './constants';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/room-types', roomTypeRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/guests', guestRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/about-info', aboutInfoRoute);
app.use('/api/about-details', aboutDetailRoute);
app.use('/api/general-settings', generalSettingsRoute);
app.use('/api/profile-info', profileInfoRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
