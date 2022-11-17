import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { generalSettingsSchema } from '../lib/validationSchemas';
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
  const validator = new Validator(generalSettingsSchema, req.body);

  validator.showErrors(res);

  const generalSettings = await prisma.generalSettings.upsert({
    where: {
      id: 1,
    },
    update: req.body,
    create: req.body,
  });
  res.send(generalSettings);
});
