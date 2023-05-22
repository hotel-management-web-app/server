import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';
import Validator from '../utils/validator';
import { loginSchema, registerSchema } from '../lib/validationSchemas';

export const registerUser = asyncHandler(async (req, res) => {
  const validator = new Validator(registerSchema, req.body);

  validator.showErrors(res);

  const { name, email, password, phoneNumber } = req.body;

  if (!name || !email || !phoneNumber || !password) {
    res.status(400);
    throw new Error('Please add all fields!');
  }

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists!');
  }

  const hashedPassword = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    },
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const validator = new Validator(loginSchema, req.body);

  validator.showErrors(res);

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && (await argon2.verify(user.password, password))) {
    const token = generateToken(user.id);
    res
      .cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        sameSite: 'none',
        secure: true,
      })
      .json({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      });
    await prisma.user.update({
      where: { email },
      data: {
        lastLogin: new Date(Date.now()).toISOString(),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

export const getMe = asyncHandler(async (req, res) => {
  res.send(req.user);
});

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
    },
    ...(offset && { skip: offset }),
    ...(currentLimit && { take: currentLimit }),
  });

  const usersCount = await prisma.user.count();
  const pageCount = Math.ceil(usersCount / currentLimit);

  res.send({ users, pageCount });
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

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.send('You are successfully logged out!');
});

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
};
