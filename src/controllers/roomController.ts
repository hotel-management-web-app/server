import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { roomSchema } from '../lib/validationSchemas';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getRooms = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit);
  const pageNumber = Number(req.query.page);
  const offset = (pageNumber - 1) * limit;

  const rooms = await prisma.room.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      roomType: {
        select: { name: true },
      },
    },
    ...(offset && { skip: offset }),
    ...(limit && { take: limit }),
  });
  res.send(rooms);
});

export const getRoom = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  const room = await prisma.room.findUnique({
    where: {
      id: id,
    },
  });

  if (!room) {
    return next(createCustomError(404, `No room with id: ${id}`));
  }

  res.send(room);
});

export const createRoom = asyncHandler(async (req, res) => {
  const validator = new Validator(roomSchema, req.body);

  validator.showErrors(res);

  const room = await prisma.room.create({ data: req.body });
  res.send(room);
});

export const updateRoom = asyncHandler(async (req, res) => {
  const validator = new Validator(roomSchema, req.body);

  validator.showErrors(res);

  const room = await prisma.room.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.send(room);
});

export const updateRoomField = asyncHandler(async (req, res) => {
  const room = await prisma.room.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.send(room);
});

export const deleteRoom = asyncHandler(async (req, res) => {
  const room = await prisma.room.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(room);
});
