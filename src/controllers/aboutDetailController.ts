import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { aboutDetailSchema } from '../lib/validationSchemas';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';
import { deleteImage } from '../utils/deleteImage';
import { createImageUrl } from '../utils/createImageUrl';

export const getAboutDetails = asyncHandler(async (req, res) => {
  const aboutDetails = await prisma.aboutDetail.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  res.send(aboutDetails);
});

export const getAboutDetail = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  const aboutDetail = await prisma.aboutDetail.findUnique({
    where: {
      id: id,
    },
  });

  if (!aboutDetail) {
    return next(createCustomError(404, `No booking with id: ${id}`));
  }

  res.send(aboutDetail);
});

export const createAboutDetail = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.data);
  const imageUrl = createImageUrl(req);

  const validator = new Validator(aboutDetailSchema, data);

  validator.showErrors(res);

  const aboutDetail = await prisma.aboutDetail.create({
    data: { ...data, image: imageUrl, aboutInfoId: 1 },
  });
  res.send(aboutDetail);
});

export const updateAboutDetail = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const aboutDetail = await prisma.aboutDetail.findUnique({
    where: {
      id: id,
    },
  });

  if (aboutDetail && req.file) deleteImage(aboutDetail.image);

  const data = JSON.parse(req.body.data);
  const imageUrl = createImageUrl(req);

  const validator = new Validator(aboutDetailSchema, data);

  validator.showErrors(res);

  const updatedAboutDetail = await prisma.aboutDetail.update({
    where: {
      id: id,
    },
    data: { ...data, ...(req.file && { image: imageUrl }) },
  });
  res.send(updatedAboutDetail);
});

export const deleteAboutDetail = asyncHandler(async (req, res) => {
  const aboutDetail = await prisma.aboutDetail.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  deleteImage(aboutDetail.image);

  res.send(aboutDetail);
});
