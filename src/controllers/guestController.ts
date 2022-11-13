import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { guestSchema } from '../lib/validationSchemas';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getGuests = asyncHandler(async (req, res) => {
  const guests = await prisma.guest.findMany();
  res.send(guests);
});

export const getGuest = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  const guest = await prisma.room.findUnique({
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

  const guest = await prisma.room.create({ data: req.body });
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