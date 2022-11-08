import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getRoomTypes = async (req: Request, res: Response) => {
  const roomTypes = await prisma.roomType.findMany();
  res.send(roomTypes);
};

export const getRoomType = async (req: Request, res: Response) => {
  const roomType = await prisma.roomType.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(roomType)
};

export const createRoomType = async (req: Request, res: Response) => {
  const roomType = await prisma.roomType.create({ data: req.body });
  res.send(roomType);
};

export const updateRoomType = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const roomType = await prisma.roomType.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  res.send(roomType);
};

export const deleteRoomType = async (req: Request, res: Response) => {
  const roomType = await prisma.roomType.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(roomType);
};
