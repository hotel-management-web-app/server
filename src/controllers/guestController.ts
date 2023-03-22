import asyncHandler from 'express-async-handler';
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { guestSchema } from '../lib/validationSchemas';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getGuests = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;

  const currentLimit = Number(limit);
  const pageNumber = Number(page);
  const offset = (pageNumber - 1) * currentLimit;

  const currentSearch = search ? String(search) : '';

  const filter: Prisma.GuestWhereInput = {
    OR: [
      {
        firstName: { contains: currentSearch, mode: 'insensitive' },
      },
      {
        lastName: { contains: currentSearch, mode: 'insensitive' },
      },
      {
        email: { contains: currentSearch, mode: 'insensitive' },
      },
    ],
  };

  const guests = await prisma.guest.findMany({
    orderBy: {
      id: 'asc',
    },
    where: filter,
    include: {
      _count: {
        select: {
          bookings: true,
        },
      },
    },
    ...(offset && { skip: offset }),
    ...(currentLimit && { take: currentLimit }),
  });

  const guestsCount = await prisma.guest.count({ where: filter });
  const pageCount = Math.ceil(guestsCount / currentLimit);

  res.send({ guests, pageCount });
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
