import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { createCustomError } from '../utils/error';

export const getRoomTypes = asyncHandler(async (req, res) => {
  const roomTypes = await prisma.roomType.findMany();
  res.send(roomTypes);
});

export const getRoomType = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  const roomType = await prisma.roomType.findUnique({
    where: {
      id: id,
    },
  });

  if (!roomType) {
    return next(createCustomError(404, `No room type with id: ${id}`));
  }

  res.send(roomType);
});

export const createRoomType = asyncHandler(async (req, res) => {
  const roomType = await prisma.roomType.create({ data: req.body });
  res.send(roomType);
});

export const updateRoomType = asyncHandler(async (req, res) => {
  const roomType = await prisma.roomType.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.send(roomType);
});

export const deleteRoomType = asyncHandler(async (req, res) => {
  const roomType = await prisma.roomType.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(roomType);
});
