import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { generalSettingsSchema } from '../lib/validationSchemas';
import { createImageUrl } from '../utils/createImageUrl';
import { deleteImage } from '../utils/deleteImage';
import { createCustomError } from '../utils/error';
import Validator from '../utils/validator';

export const getGeneralSettings = asyncHandler(async (req, res, next) => {
  const generalSettings = await prisma.generalSettings.findFirst();

  if (!generalSettings) {
    return next(createCustomError(404, 'Wrong Id!'));
  }

  res.send(generalSettings);
});

export const updateGeneralSettings = asyncHandler(async (req, res) => {
  const generalSettings = await prisma.generalSettings.findUnique({
    where: {
      id: 1,
    },
  });

  if (generalSettings && req.file) deleteImage(generalSettings.logo);

  const data = JSON.parse(req.body.data);
  const logoUrl = createImageUrl(req);
  const validator = new Validator(generalSettingsSchema, data);

  validator.showErrors(res);

  const updatedGeneralSettings = await prisma.generalSettings.upsert({
    where: {
      id: 1,
    },
    update: { ...data, ...(req.file && { logo: logoUrl }) },
    create: { ...data, logo: logoUrl },
  });
  res.send(updatedGeneralSettings);
});
