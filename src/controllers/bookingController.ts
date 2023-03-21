import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { bookingSchema, guestSchema } from '../lib/validationSchemas';
import { countDaysBetweenDates } from '../utils/countDaysBetweenDates';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getBookings = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit);
  const pageNumber = Number(req.query.page);
  const offset = (pageNumber - 1) * limit;

  const bookings = await prisma.booking.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      room: {
        select: {
          roomNumber: true,
        },
      },
      guest: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    ...(offset && { skip: offset }),
    ...(limit && { take: limit }),
  });

  const bookingsCount = await prisma.booking.count();
  const pageCount = Math.ceil(bookingsCount / limit);

  res.send({ bookings, pageCount });
});

export const getBooking = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  const booking = await prisma.booking.findUnique({
    where: {
      id: id,
    },
    include: {
      room: {
        include: { roomType: { include: { rooms: true } } },
      },
    },
  });

  if (!booking) {
    return next(createCustomError(404, `No booking with id: ${id}`));
  }

  res.send(booking);
});

export const createBooking = asyncHandler(async (req, res) => {
  const validator = new Validator(bookingSchema, req.body);

  validator.showErrors(res);

  const { roomId, arrivalDate, departureDate } = req.body;

  const room = await prisma.room.findUniqueOrThrow({
    where: { id: roomId },
    include: { roomType: true },
  });

  const { price } = room.roomType;

  const nightsCount = countDaysBetweenDates(arrivalDate, departureDate);
  const totalPrice: number = nightsCount * price;

  const booking = await prisma.booking.create({
    data: { ...req.body, totalPrice },
  });
  res.send(booking);
});

export const createBookingWithGuest = asyncHandler(async (req, res) => {
  const validator = new Validator(guestSchema, req.body);

  validator.showErrors(res);

  const booking = await prisma.guest.create({
    data: {
      ...req.body,
      bookings: {
        create: req.body.booking,
      },
    },
  });
  res.send(booking);
});

export const updateBooking = asyncHandler(async (req, res) => {
  const validator = new Validator(bookingSchema, req.body);

  validator.showErrors(res);

  const booking = await prisma.booking.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.send(booking);
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(booking);
});
