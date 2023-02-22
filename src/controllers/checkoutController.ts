import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import Stripe from 'stripe';
import { countDaysBetweenDates } from '../utils/countDaysBetweenDates';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});

export const checkout = asyncHandler(async (req, res) => {
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
  } = req.body;

  const roomTypes = await prisma.roomType.findMany({
    include: { rooms: { include: { bookings: true } } },
  });

  const bookedRoomType = roomTypes.find(
    (roomType) => roomType.id === roomTypeId,
  );

  const numberOfNights = countDaysBetweenDates(arrivalDate, departureDate);

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
        (arrivalDate >= booking.arrivalDate &&
          arrivalDate <= booking.departureDate) ||
        (departureDate >= booking.arrivalDate &&
          departureDate <= booking.departureDate)
      ) {
        return false;
      }

      return true;
    });
  });

  if (room) {
    await prisma.booking.create({
      data: {
        arrivalDate,
        departureDate,
        adults,
        children,
        roomId: room?.id,
        guestId: newGuest.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
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
    success_url: `${process.env.CLIENT_URL}/payment-success`,
  });

  res.send({ url: session.url });
});
