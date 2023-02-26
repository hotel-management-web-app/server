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
    success_url: `${process.env.CLIENT_URL}/booking-form/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/booking-form`,
  });

  res.send({ url: session.url });
});

export const createNewBooking = asyncHandler(async (req, res, next) => {
  const intent = await stripe.checkout.sessions.retrieve(req.body.sessionId);

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
      roomId: room.id,
      guestId: guest.id,
    },
  });

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
