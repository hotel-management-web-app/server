import Joi from 'joi';

export const roomTypeSchema = Joi.object({
  name: Joi.string().min(3).max(48).required(),
  description: Joi.string().allow(''),
  occupancy: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
  amenities: Joi.array().items(Joi.string()),
  details: Joi.array().items(Joi.string()),
  image: Joi.string(),
  images: Joi.array().items(Joi.string()),
});

export const roomSchema = Joi.object({
  roomStatus: Joi.string(),
  roomTypeId: Joi.number().required(),
  floorNumber: Joi.number().required(),
  roomNumber: Joi.number().required(),
});

export const bookingSchema = Joi.object({
  status: Joi.string(),
  arrivalDate: Joi.date().required(),
  departureDate: Joi.date().required(),
  roomId: Joi.number().required(),
  adults: Joi.number().required(),
  children: Joi.number().required(),
  guestId: Joi.number(),
});

export const guestSchema = Joi.object({
  firstName: Joi.string().min(3).max(48).required(),
  lastName: Joi.string().min(3).max(48).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  lastBooking: Joi.date(),
  notes: Joi.string().allow(''),
  status: Joi.string(),
  booking: bookingSchema,
});

export const aboutInfoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
});

export const aboutDetailSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
});

export const generalSettingsSchema = Joi.object({
  hotelName: Joi.string().required(),
  country: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
});

export const profileInfoSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
});

export const contactDataSchema = Joi.object({
  firstName: Joi.string().min(3).max(48).required(),
  secondName: Joi.string().min(3).max(48).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});
