import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { roomTypeSchema } from '../lib/validationSchemas';
import { createImageUrl } from '../utils/createImageUrl';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getRoomTypes = asyncHandler(async (req, res) => {
  const roomTypes = await prisma.roomType.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      rooms: true,
    },
  });
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
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files['image'][0];
  const images = files['images'];

  const data = JSON.parse(req.body.data);
  const imageUrl = createImageUrl(req, image);
  const imagesUrl = images.map((image) => createImageUrl(req, image));
  const validator = new Validator(roomTypeSchema, data);

  validator.showErrors(res);

  const roomType = await prisma.roomType.create({
    data: { ...data, image: imageUrl, images: imagesUrl },
  });
  res.send(roomType);
});

export const updateRoomType = asyncHandler(async (req, res) => {
  const validator = new Validator(roomTypeSchema, req.body);

  validator.showErrors(res);

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
