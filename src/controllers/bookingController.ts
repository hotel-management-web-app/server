import asyncHandler from 'express-async-handler';
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { bookingSchema, guestSchema } from '../lib/validationSchemas';
import { countDaysBetweenDates } from '../utils/countDaysBetweenDates';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getBookings = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;

  const currentLimit = Number(limit);
  const pageNumber = Number(page);
  const offset = (pageNumber - 1) * currentLimit;

  const currentSearch = search ? String(search) : '';

  const filter: Prisma.BookingWhereInput = {
    OR: [
      {
        id: { contains: currentSearch, mode: 'insensitive' },
      },
      {
        guest: {
          OR: [
            {
              firstName: { contains: currentSearch, mode: 'insensitive' },
            },
            {
              lastName: { contains: currentSearch, mode: 'insensitive' },
            },
          ],
        },
      },
    ],
  };

  const bookings = await prisma.booking.findMany({
    orderBy: {
      id: 'asc',
    },
    where: filter,
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
    ...(currentLimit && { take: currentLimit }),
  });

  const bookingsCount = await prisma.booking.count({
    where: filter,
  });
  const pageCount = Math.ceil(bookingsCount / currentLimit);

  res.send({ bookings, pageCount });
});

export const getBooking = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
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
      id: req.params.id,
    },
    data: req.body,
  });
  res.send(booking);
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await prisma.booking.delete({
    where: {
      id: req.params.id,
    },
  });
  res.send(booking);
});
