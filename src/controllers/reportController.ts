import { Booking, Room, RoomType } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { countDaysBetweenDates } from '../utils/countDaysBetweenDates';

interface RoomWithRoomType extends Room {
  roomType: RoomType;
}

interface BookingWithRoom extends Booking {
  room: RoomWithRoomType;
}

export const getReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;
  const bookings = await prisma.booking.findMany({
    where: {
      arrivalDate: { gte: startDate, lte: endDate },
    },
    include: {
      room: { include: { roomType: true } },
    },
  });

  const allBookingsInfo = getReportInfo(bookings);

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === 'CONFIRMED',
  );
  const confirmedBookingsInfo = getReportInfo(confirmedBookings);

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === 'CANCELLED',
  );
  const cancelledBookingsInfo = getReportInfo(cancelledBookings);

  const averageInfo = getAverageInfo(bookings);

  const roomTypesInfo = await getRoomTypesInfo(
    new Date(startDate),
    new Date(endDate),
  );

  const report = {
    allBookingsInfo,
    confirmedBookingsInfo,
    cancelledBookingsInfo,
    averageInfo,
    roomTypesInfo,
  };

  res.send(report);
});

const getReportInfo = (bookings: BookingWithRoom[]) => {
  const bookingsCount = bookings.length;

  let guestCount = 0;
  let totalNights = 0;
  let totalPrice = 0;
  bookings.forEach((booking) => {
    guestCount += booking.adults + booking.children;

    const numberOfNights = countDaysBetweenDates(
      booking.arrivalDate,
      booking.departureDate,
    );

    totalNights += numberOfNights;

    totalPrice += booking.totalPrice;
  });

  return { bookingsCount, guestCount, totalNights, totalPrice };
};

const getAverageInfo = (bookings: BookingWithRoom[]) => {
  let allGuestCount = 0;
  let adultsCount = 0;
  let childrenCount = 0;

  bookings.forEach((booking) => {
    const { adults, children } = booking;
    allGuestCount += adults + children;
    adultsCount += adults;
    childrenCount += children;
  });

  const averageAdultsGuests =
    Number((adultsCount / allGuestCount).toFixed(2)) * 100 || 0;
  const averageChildrenGuests =
    Number((childrenCount / allGuestCount).toFixed(2)) * 100 || 0;

  const bookingsInfo = getReportInfo(bookings);
  const { totalNights, guestCount } = bookingsInfo;
  const bookingsCount = bookings.length;

  const nightsPerBooking =
    Number((totalNights / bookingsCount).toFixed(2)) || 0;
  const guestsPerBooking = Number((guestCount / bookingsCount).toFixed(2)) || 0;

  const averageInfo = {
    adultsGuests: `${adultsCount} (${averageAdultsGuests}%)`,
    childrenGuests: `${childrenCount} (${averageChildrenGuests}%)`,
    nightsPerBooking,
    guestsPerBooking,
  };

  return averageInfo;
};

const getRoomTypesInfo = async (startDate: Date, endDate: Date) => {
  const roomTypes = await prisma.roomType.findMany({
    include: {
      rooms: {
        include: {
          bookings: { include: { guest: true } },
        },
      },
    },
  });

  const roomTypesInfo = roomTypes.map((roomType) => {
    const roomTypeName = roomType.name;
    const allBookings: Booking[] = [];

    roomType.rooms.forEach((room) => {
      allBookings.push(...room.bookings);
    });

    const filteredBookings = allBookings.filter((booking) => {
      if (booking.arrivalDate >= startDate && booking.arrivalDate <= endDate)
        return true;

      return false;
    });

    const confirmedBookings = filteredBookings.filter(
      (booking) => booking.status === 'CONFIRMED',
    );

    const cancelledBookings = filteredBookings.filter(
      (booking) => booking.status === 'CANCELLED',
    );

    const allBookingsInfo = getBookingsInfo(filteredBookings, roomType.price);
    const confirmedBookingsInfo = getBookingsInfo(
      confirmedBookings,
      roomType.price,
    );
    const cancelledBookingsInfo = getBookingsInfo(
      cancelledBookings,
      roomType.price,
    );

    return {
      roomTypeName,
      allBookingsInfo,
      confirmedBookingsInfo,
      cancelledBookingsInfo,
    };
  });

  return roomTypesInfo;
};

const getBookingsInfo = (bookings: Booking[], roomTypePrice: number) => {
  const bookingsCount = bookings.length;

  let guestsCount = 0;
  let nightsCount = 0;

  bookings.forEach((booking) => {
    guestsCount += booking.adults + booking.children;

    nightsCount += countDaysBetweenDates(
      booking.arrivalDate,
      booking.departureDate,
    );
  });

  const totalAmount = nightsCount * roomTypePrice;

  return { bookingsCount, guestsCount, nightsCount, totalAmount };
};
