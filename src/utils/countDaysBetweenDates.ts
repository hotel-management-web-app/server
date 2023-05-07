export const countDaysBetweenDates = (
  arrivalDate: Date,
  departureDate: Date,
) => {
  const daysBetweenDates = Math.ceil(
    (new Date(departureDate).getTime() - new Date(arrivalDate).getTime()) /
      (60 * 60 * 24 * 1000),
  );

  return daysBetweenDates === 0 ? 1 : daysBetweenDates;
};
