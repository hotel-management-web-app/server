import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { aboutInfoSchema } from '../lib/validationSchemas';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getAboutDetails = asyncHandler(async (req, res) => {
  const aboutDetails = await prisma.aboutDetail.findMany();
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
  const validator = new Validator(aboutInfoSchema, req.body);

  validator.showErrors(res);

  const aboutDetail = await prisma.aboutDetail.create({
    data: { ...req.body, aboutInfoId: 1 },
  });
  res.send(aboutDetail);
});

export const updateAboutDetail = asyncHandler(async (req, res) => {
  const validator = new Validator(aboutInfoSchema, req.body);

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
