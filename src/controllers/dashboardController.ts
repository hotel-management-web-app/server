import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';

export const getDashboard = asyncHandler(async (req, res) => {
  const personCount = await getPersonCount();
  const allRoomStatusCount = await getAllRoomStatusCount();
  const allBookingStatusCount = await getAllBookingStatusCount();
  const allHousekeepingStatusCount = await getAllHousekeepingStatusCount();
  const arrivalsAndDeparturesToday = await getArrivalsAndDeparturesToday();

  const dashboardData = {
    personCount,
    allRoomStatusCount,
    allBookingStatusCount,
    allHousekeepingStatusCount,
    arrivalsAndDeparturesToday,
  };

  res.send(dashboardData);
});

const getPersonCount = async () => {
  const personCount = await prisma.booking.aggregate({
    _sum: {
      adults: true,
      children: true,
    },
  });

  const { adults, children } = personCount._sum;

  return {
    adults,
    children,
  };
};

const getAllRoomStatusCount = async () => {
  const available = await prisma.room.count({
    where: {
      roomStatus: 'VACANT',
    },
  });

  const reserved = await prisma.room.count({
    where: {
      roomStatus: 'RESERVED',
    },
  });

  return {
    available,
    reserved,
  };
};

const getAllBookingStatusCount = async () => {
  const confirmed = await prisma.booking.count({
    where: {
      status: 'CONFIRMED',
    },
  });

  const pending = await prisma.booking.count({
    where: {
      status: 'PENDING',
    },
  });

  const cancelled = await prisma.booking.count({
    where: {
      status: 'CANCELLED',
    },
  });

  const notConfirmed = await prisma.booking.count({
    where: {
      status: 'NOT_CONFIRMED',
    },
  });

  return {
    confirmed,
    pending,
    cancelled,
    notConfirmed,
  };
};

const getArrivalsAndDeparturesToday = async () => {
  const minTodayDate = new Date(Date.now());
  const maxTodayDate = new Date(Date.now());
  minTodayDate.setUTCHours(0, 0, 0, 0);
  maxTodayDate.setUTCHours(23, 59, 59, 59);

  const arrivalsToday = await prisma.booking.findMany({
    where: {
      arrivalDate: { gte: minTodayDate, lte: maxTodayDate },
    },
    include: {
      guest: true,
      room: { include: { roomType: true } },
    },
  });

  const departuresToday = await prisma.booking.findMany({
    where: {
      departureDate: { gte: minTodayDate, lte: maxTodayDate },
    },
    include: {
      guest: true,
      room: { include: { roomType: true } },
    },
  });

  return {
    arrivalsToday,
    departuresToday,
  };
};

const getAllHousekeepingStatusCount = async () => {
  const clean = await prisma.room.count({
    where: {
      housekeepingStatus: 'CLEAN',
    },
  });

  const cleaning = await prisma.room.count({
    where: {
      housekeepingStatus: 'CLEANING',
    },
  });

  const dirty = await prisma.room.count({
    where: {
      housekeepingStatus: 'DIRTY',
    },
  });

  const outOfService = await prisma.room.count({
    where: {
      housekeepingStatus: 'OUT_OF_SERVICE',
    },
  });

  return {
    clean,
    cleaning,
    dirty,
    outOfService,
  };
};