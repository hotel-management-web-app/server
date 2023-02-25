import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import Stripe from 'stripe';
import { countDaysBetweenDates } from '../utils/countDaysBetweenDates';
import { createCustomError } from '../utils/error';
import { bookingFormSchema } from '../lib/validationSchemas';
import Validator from '../utils/validator';

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
    success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ url: session.url });
});

export const createNewBooking = asyncHandler(async (req, res, next) => {
  const intent = await stripe.checkout.sessions.retrieve(req.body.sessionId);

  if (intent.payment_status !== 'paid') {
    return next(createCustomError(404, `Booking not paid!`));
  }

  const {
    roomTypeId,
    arrivalDate,
    departureDate,
    adults,
    children,
    firstName,
    lastName,
    email,
    phoneNumber,
    notes,
  } = bookingData;

  const roomTypes = await prisma.roomType.findMany({
    include: { rooms: { include: { bookings: true } } },
  });

  const bookedRoomType = roomTypes.find(
    (roomType) => roomType.id === roomTypeId,
  );

  const newGuest = await prisma.guest.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNumber,
      notes,
    },
  });

  const room = bookedRoomType?.rooms.find((room) => {
    return room.bookings.some((booking) => {
      if (
        (new Date(arrivalDate) >= new Date(booking.arrivalDate) &&
          new Date(arrivalDate) <= new Date(booking.departureDate)) ||
        (new Date(departureDate) >= new Date(booking.arrivalDate) &&
          new Date(departureDate) <= new Date(booking.departureDate))
      ) {
        return false;
      }

      return true;
    });
  });

  if (!room) {
    return next(createCustomError(404, `No room available!`));
  }

  const newBooking = await prisma.booking.create({
    data: {
      arrivalDate: new Date(arrivalDate),
      departureDate: new Date(departureDate),
      adults,
      children,
      roomId: room.id,
      guestId: newGuest.id,
    },
  });

  res.send({ newGuest, newBooking });
});
