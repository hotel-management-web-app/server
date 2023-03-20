import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { guestSchema } from '../lib/validationSchemas';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getGuests = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit);
  const pageNumber = Number(req.query.page);
  const offset = (pageNumber - 1) * limit;

  const guests = await prisma.guest.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      _count: {
        select: {
          bookings: true,
        },
      },
    },
    ...(offset && { skip: offset }),
    ...(limit && { take: limit }),
  });
  res.send(guests);
});

export const getGuest = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  const guest = await prisma.guest.findUnique({
    where: {
      id: id,
    },
  });

  if (!guest) {
    return next(createCustomError(404, `No guest with id: ${id}`));
  }

  res.send(guest);
});

export const createGuest = asyncHandler(async (req, res) => {
  const validator = new Validator(guestSchema, req.body);

  validator.showErrors(res);

  const guest = await prisma.guest.create({ data: req.body });
  res.send(guest);
});

export const updateGuest = asyncHandler(async (req, res) => {
  const validator = new Validator(guestSchema, req.body);

  validator.showErrors(res);

  const guest = await prisma.guest.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.send(guest);
});

export const deleteGuest = asyncHandler(async (req, res) => {
  const guest = await prisma.guest.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(guest);
});
