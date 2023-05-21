import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import prisma from '../lib/prisma';
import Stripe from 'stripe';
import { countDaysBetweenDates } from '../utils/countDaysBetweenDates';
import { createCustomError } from '../utils/error';
import { bookingFormSchema } from '../lib/validationSchemas';
import Validator from '../utils/validator';
import { Booking, Guest } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});

interface NewBooking {
  roomTypeId: number;
  arrivalDate: Date;
  departureDate: Date;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  notes: string;
}

let bookingData: NewBooking;

export const checkout = asyncHandler(async (req, res) => {
  const validator = new Validator(bookingFormSchema, req.body);

  validator.showErrors(res);

  const { roomTypeId, email, arrivalDate, departureDate } = req.body;
  bookingData = req.body;

  const roomTypes = await prisma.roomType.findMany({
    include: { rooms: { include: { bookings: true } } },
  });

  const bookedRoomType = roomTypes.find(
    (roomType) => roomType.id === roomTypeId,
  );

  const numberOfNights = countDaysBetweenDates(arrivalDate, departureDate);

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${bookedRoomType?.name} - reservation`,
          },
          unit_amount: Number(bookedRoomType?.price) * 100 * numberOfNights,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/booking-form/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/booking-form`,
  });

  res.send({ url: session.url });
});

export const createNewBooking = asyncHandler(async (req, res, next) => {
  const intent = await stripe.checkout.sessions.retrieve(req.body.sessionId);

  if (!intent) {
    return next(createCustomError(404, `Error with checkout!`));
  }

  if (intent.payment_status !== 'paid') {
    return next(createCustomError(404, `Booking not paid!`));
  }

  const { arrivalDate, departureDate, adults, children } = bookingData;

  const guest = await getExistingOrNewGuest();

  const room = await findAvailableRoom();

  if (!room) {
    return next(createCustomError(404, `No room available!`));
  }

  const newBooking = await prisma.booking.create({
    data: {
      arrivalDate: new Date(arrivalDate),
      departureDate: new Date(departureDate),
      adults,
      children,
      totalPrice: intent.amount_total || 0,
      roomId: room.id,
      guestId: guest.id,
    },
  });

  sendEmailMessage(guest, newBooking);

  res.send({ guest, newBooking });
});

const getExistingOrNewGuest = async () => {
  const { firstName, lastName, email, phoneNumber, notes } = bookingData;

  const guests = await prisma.guest.findMany();
  const existingGuest = guests.find(
    (guest) =>
      guest.firstName === firstName &&
      guest.lastName === lastName &&
      guest.email === email,
  );

  if (existingGuest) return existingGuest;
  else {
    const newGuest = await prisma.guest.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        notes,
      },
    });

    return newGuest;
  }
};

const findAvailableRoom = async () => {
  const { roomTypeId, arrivalDate, departureDate } = bookingData;

  const roomTypes = await prisma.roomType.findMany({
    include: { rooms: { include: { bookings: true } } },
  });

  const bookedRoomType = roomTypes.find(
    (roomType) => roomType.id === roomTypeId,
  );

  return bookedRoomType?.rooms.find((room) => {
    return room.bookings.every((booking) => {
      const incomingArrivalDate = new Date(arrivalDate);
      const incomingDepartureDate = new Date(departureDate);
      const bookingArrivalDate = new Date(booking.arrivalDate);
      const bookingDepartureDate = new Date(booking.departureDate);

      if (
        (incomingArrivalDate >= bookingArrivalDate &&
          incomingArrivalDate <= bookingDepartureDate) ||
        (incomingDepartureDate >= bookingArrivalDate &&
          incomingDepartureDate <= bookingDepartureDate)
      ) {
        return false;
      }

      return true;
    });
  });
};

const sendEmailMessage = async (guest: Guest, booking: Booking) => {
  const user = process.env.CONTACT_USER;
  const password = process.env.CONTACT_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user, // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  const room = await prisma.room.findUnique({
    where: { id: booking.roomId },
    include: { roomType: true },
  });
  const generalSettings = await prisma.generalSettings.findFirst();

  const { firstName, lastName } = guest;
  const { id, arrivalDate, departureDate, adults, children, totalPrice } =
    booking;
  const nights = countDaysBetweenDates(arrivalDate, departureDate);

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: user, // sender address
    to: guest.email, // list of receivers
    subject: `Hotel - Booking confirmation`, // Subject line
    html: `
    <div>
      <h1>Dear ${firstName} ${lastName}</h1>
      <p>Thank you for your booking. This email confirms that your booking has been received.</p>
      <br />
      <h2>Details</h2>
      <p><strong>Booking Reference number:</strong> ${id}</p>
      <p><strong>Room type:</strong> ${room?.roomType.name}</p>
      <p><strong>Check-in date:</strong> ${arrivalDate}</p>
      <p><strong>Check-out date:</strong> ${departureDate}</p>
      <p><strong>Number of nights:</strong> ${nights}</p>
      <p><strong>Adults:</strong> ${adults}</p>
      <p><strong>Children:</strong> ${children}</p>
      <p><strong>Price:</strong> ${(totalPrice / 100).toFixed(2)}</p>
      <br />
      <p>We look forward to seeing you there! Have a happy stay!</p>
      <br />
      <p>Best Regards</p>
      <p><strong>${generalSettings?.hotelName}</strong></p>
    </div>`, // html body
  });

  return info;
};
