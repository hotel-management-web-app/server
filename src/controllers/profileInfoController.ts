import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { profileInfoSchema } from '../lib/validationSchemas';
import Validator from '../utils/validator';

export const getProfileInfo = asyncHandler(async (req, res) => {
  const profileInfo = await prisma.profileInfo.findFirst();
  res.send(profileInfo);
});

export const updateProfileInfo = asyncHandler(async (req, res) => {
  const validator = new Validator(profileInfoSchema, req.body);

  validator.showErrors(res);

  
  const profileInfo = await prisma.profileInfo.upsert({
    where: {
      id: 1,
    },
    update: req.body,
    create: {
      name: 'Admin',
      email: 'admin@admin.com',
      phoneNumber: '123456789',
    },
  });
  res.send(profileInfo);
});
