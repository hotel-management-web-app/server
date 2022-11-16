import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { aboutInfoSchema } from '../lib/validationSchemas';
import Validator from '../utils/validator';

export const getAboutInfo = asyncHandler(async (req, res) => {
  const aboutInfo = await prisma.aboutInfo.findFirst();
  res.send(aboutInfo);
});

export const updateAboutInfo = asyncHandler(async (req, res) => {
  const validator = new Validator(aboutInfoSchema, req.body);

  validator.showErrors(res);

  const aboutInfo = await prisma.aboutInfo.upsert({
    where: {
      id: 1,
    },
    update: req.body,
    create: {
      title: '',
      description: '',
    },
  });
  res.send(aboutInfo);
});
