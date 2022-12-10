import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { bookingSchema } from '../lib/validationSchemas';
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
