import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';
import Validator from '../utils/validator';
import { userSchema } from '../lib/validationSchemas';

export const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;

  const currentLimit = Number(limit);
  const pageNumber = Number(page);
  const offset = (pageNumber - 1) * currentLimit;

  const currentSearch = search ? String(search) : '';

  const filter: Prisma.UserWhereInput = {
    name: { contains: currentSearch, mode: 'insensitive' },
  };

  const users = await prisma.user.findMany({
    orderBy: {
      id: 'asc',
    },
    where: filter,
    select: {
      id: true,
      name: true,
      email: true,
      lastLogin: true,
      phoneNumber: true,
      role: true,
    },
    ...(offset && { skip: offset }),
    ...(currentLimit && { take: currentLimit }),
  });

  const usersCount = await prisma.user.count();
  const pageCount = Math.ceil(usersCount / currentLimit);

  const userId = req?.user?.id;

  res.send({ userId, users, pageCount });
});

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      email: true,
      lastLogin: true,
      phoneNumber: true,
    },
  });

  res.send(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const validator = new Validator(userSchema, req.body);

  validator.showErrors(res);

  const user = await prisma.user.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });

  res.send(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  if (id === req?.user?.id) throw new Error('User cannot delete himself!');

  const user = await prisma.user.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(user);
});
