import Joi from 'joi';

export const roomTypeSchema = Joi.object({
  name: Joi.string().min(3).max(48).required(),
  description: Joi.string(),
  occupancy: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
  amenities: Joi.array().items(Joi.string()),
  details: Joi.array().items(Joi.string()),
  roomImage: Joi.string(),
  roomImages: Joi.array().items(Joi.string()),
});

export const roomSchema = Joi.object({
  roomStatus: Joi.string(),
  roomTypeId: Joi.number().required(),
  floorNumber: Joi.number().required(),
  roomNumber: Joi.number().required(),
});

export const guestSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  lastBooking: Joi.date(),
  city: Joi.string(),
  status: Joi.string(),
});

export const bookingSchema = Joi.object({
  status: Joi.string(),
  arrivalDate: Joi.date().required(),
  departureDate: Joi.date().required(),
  roomId: Joi.number().required(),
  adults: Joi.number().required(),
  children: Joi.number().required(),
});

export const aboutInfoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('')
})
