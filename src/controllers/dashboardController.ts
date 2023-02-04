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
  const availableRooms = await prisma.room.count({
    where: {
      roomStatus: 'VACANT',
    },
  });

  const reservedRooms = await prisma.room.count({
    where: {
      roomStatus: 'RESERVED',
    },
  });

  return {
    availableRooms,
    reservedRooms,
  };
};

const getAllBookingStatusCount = async () => {
  const confirmedBookings = await prisma.booking.count({
    where: {
      status: 'CONFIRMED',
    },
  });

  const pendingBookings = await prisma.booking.count({
    where: {
      status: 'PENDING',
    },
  });

  const cancelledBookings = await prisma.booking.count({
    where: {
      status: 'CANCELLED',
    },
  });

  const notConfirmedBookings = await prisma.booking.count({
    where: {
      status: 'NOT_CONFIRMED',
    },
  });

  return {
    confirmedBookings,
    pendingBookings,
    cancelledBookings,
    notConfirmedBookings,
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
    },
  });

  const departuresToday = await prisma.booking.findMany({
    where: {
      departureDate: { gte: minTodayDate, lte: maxTodayDate },
    },
    include: {
      guest: true,
    },
  });

  return {
    arrivalsToday,
    departuresToday,
  };
};

const getAllHousekeepingStatusCount = async () => {
  const cleanStatusCount = await prisma.room.count({
    where: {
      housekeepingStatus: 'CLEAN',
    },
  });

  const cleaningStatusCount = await prisma.room.count({
    where: {
      housekeepingStatus: 'CLEANING',
    },
  });

  const dirtyStatusCount = await prisma.room.count({
    where: {
      housekeepingStatus: 'DIRTY',
    },
  });

  const outOfServiceStatusCount = await prisma.room.count({
    where: {
      housekeepingStatus: 'OUT_OF_SERVICE',
    },
  });

  return {
    cleanStatusCount,
    cleaningStatusCount,
    dirtyStatusCount,
    outOfServiceStatusCount,
  };
};
