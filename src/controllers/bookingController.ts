import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { bookingSchema, guestSchema } from '../lib/validationSchemas';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getBookings = asyncHandler(async (req, res) => {
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
  });
  res.send(bookings);
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

  const booking = await prisma.booking.create({ data: req.body });
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
