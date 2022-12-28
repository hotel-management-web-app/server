import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { aboutDetailSchema } from '../lib/validationSchemas';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

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
  const protocol = req.protocol;
  const host = req.headers.host;
  const imageName = req.file?.filename;
  const imageUrl = `${protocol}://${host}/${imageName}`;

  const validator = new Validator(aboutDetailSchema, data);

  validator.showErrors(res);

  const aboutDetail = await prisma.aboutDetail.create({
    data: { ...data, image: imageUrl, aboutInfoId: 1 },
  });
  res.send(aboutDetail);
});

export const updateAboutDetail = asyncHandler(async (req, res) => {
  const validator = new Validator(aboutDetailSchema, req.body);

  validator.showErrors(res);

  const aboutDetail = await prisma.aboutDetail.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.send(aboutDetail);
});

export const deleteAboutDetail = asyncHandler(async (req, res) => {
  const aboutDetail = await prisma.aboutDetail.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(aboutDetail);
});
