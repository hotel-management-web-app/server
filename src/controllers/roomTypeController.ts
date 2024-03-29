import asyncHandler from 'express-async-handler';
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { roomTypeSchema } from '../lib/validationSchemas';
import { createImageUrl } from '../utils/createImageUrl';
import { deleteImage } from '../utils/deleteImage';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getRoomTypes = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;

  const currentLimit = Number(limit);
  const pageNumber = Number(page);
  const offset = (pageNumber - 1) * currentLimit;

  const currentSearch = search ? String(search) : '';

  const filter: Prisma.RoomTypeWhereInput = {
    name: { contains: currentSearch, mode: 'insensitive' },
  };

  const roomTypes = await prisma.roomType.findMany({
    orderBy: {
      id: 'asc',
    },
    where: filter,
    include: {
      rooms: { include: { bookings: true } },
    },
    ...(offset && { skip: offset }),
    ...(currentLimit && { take: currentLimit }),
  });

  const roomTypesCount = await prisma.roomType.count({ where: filter });
  const pageCount = Math.ceil(roomTypesCount / currentLimit);

  res.send({ roomTypes, pageCount });
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
  const image = files?.['image']?.[0];
  const images = files['images'];

  const data = JSON.parse(req.body.data);
  const imageUrl = createImageUrl(req, image);
  const imagesUrl = images?.map((image) => createImageUrl(req, image));
  const validator = new Validator(roomTypeSchema, data);

  validator.showErrors(res);

  const roomType = await prisma.roomType.create({
    data: { ...data, image: imageUrl, images: imagesUrl },
  });
  res.send(roomType);
});

export const updateRoomType = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const roomType = await prisma.roomType.findUnique({
    where: { id },
  });

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files?.['image']?.[0];
  const images = files['images'];

  if (roomType && image) {
    deleteImage(roomType.image);
  }

  if (roomType && images) {
    roomType.images.forEach((image) => deleteImage(image));
  }

  const data = JSON.parse(req.body.data);
  const imageUrl = createImageUrl(req, image);
  const imagesUrl = images?.map((image) => createImageUrl(req, image));
  const validator = new Validator(roomTypeSchema, data);

  validator.showErrors(res);

  const updatedRoomType = await prisma.roomType.update({
    where: {
      id,
    },
    data: {
      ...data,
      ...(image && { image: imageUrl }),
      ...(images && { images: imagesUrl }),
    },
  });
  res.send(updatedRoomType);
});

export const deleteRoomType = asyncHandler(async (req, res) => {
  const roomType = await prisma.roomType.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  deleteImage(roomType?.image);

  roomType.images.forEach((image: string) => {
    deleteImage(image);
  });

  res.send(roomType);
});
