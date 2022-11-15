import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { bookingSchema } from '../lib/validationSchemas';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await prisma.booking.findMany();
  res.send(bookings);
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