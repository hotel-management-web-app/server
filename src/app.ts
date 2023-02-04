import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { errorHandler } from './middleware/errorMiddleware';
import roomTypeRoute from './routes/roomTypeRoute';
import roomRoute from './routes/roomRoute';
import guestRoute from './routes/guestRoute';
import bookingRoute from './routes/bookingRoute';
import aboutInfoRoute from './routes/aboutInfoRoute';
import aboutDetailRoute from './routes/aboutDetailRoute';
import generalSettingsRoute from './routes/generalSettingsRoute';
import userRoute from './routes/userRoute';
import profileInfoRoute from './routes/profileInfoRoute';
import dashboardRoute from './routes/dashboardRoute';
import tokenRoute from './routes/tokenRoute';
import { port } from './constants';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
// app.use(csrf({ cookie: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const prefix = '/api';

app.use(prefix + '/auth', userRoute);
app.use(prefix + '/profile-info', profileInfoRoute);
app.use(prefix + '/room-types', roomTypeRoute);
app.use(prefix + '/rooms', roomRoute);
app.use(prefix + '/guests', guestRoute);
app.use(prefix + '/bookings', bookingRoute);
app.use(prefix + '/about-info', aboutInfoRoute);
app.use(prefix + '/about-details', aboutDetailRoute);
app.use(prefix + '/general-settings', generalSettingsRoute);
app.use(prefix + '/dashboard', dashboardRoute);
app.use(prefix + '/', tokenRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
