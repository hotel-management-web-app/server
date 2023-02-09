import { Booking, Room, RoomType } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';

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
      departureDate: { gte: startDate, lte: endDate },
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

  const report = {
    allBookingsInfo,
    confirmedBookingsInfo,
    cancelledBookingsInfo,
    averageInfo,
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

    const numberOfNights = Math.ceil(
      (new Date(booking.departureDate).getTime() -
        new Date(booking.arrivalDate).getTime()) /
        (60 * 60 * 24 * 1000),
    );

    totalNights += numberOfNights;

    totalPrice += booking.room.roomType.price * numberOfNights;
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
    Number((adultsCount / allGuestCount).toFixed(2)) * 100;
  const averageChildrenGuests =
    Number((childrenCount / allGuestCount).toFixed(2)) * 100;

  const bookingsInfo = getReportInfo(bookings);
  const { totalNights, guestCount } = bookingsInfo;
  const bookingsCount = bookings.length;

  const nightsPerBooking = (totalNights / bookingsCount).toFixed(2);
  const guestsPerBooking = (guestCount / bookingsCount).toFixed(2);

  const averageInfo = {
    adultsGuests: `${adultsCount} (${averageAdultsGuests}%)`,
    childrenGuests: `${childrenCount} (${averageChildrenGuests}%)`,
    nightsPerBooking,
    guestsPerBooking,
  };

  return averageInfo;
};
