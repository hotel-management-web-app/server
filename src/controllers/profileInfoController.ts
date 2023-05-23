import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { profileInfoSchema } from '../lib/validationSchemas';
import Validator from '../utils/validator';

export const getProfileInfo = asyncHandler(async (req, res) => {
  const profileInfo = await prisma.user.findUnique({
    where: {
      id: req?.user?.id,
    },
    select: {
      name: true,
      email: true,
      phoneNumber: true,
      lastLogin: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.send(profileInfo);
});

export const updateProfileInfo = asyncHandler(async (req, res) => {
  const validator = new Validator(profileInfoSchema, req.body);

  validator.showErrors(res);

  const profileInfo = await prisma.user.update({
    where: {
      id: req?.user?.id,
    },
    data: req.body,
  });
  res.send(profileInfo);
});
