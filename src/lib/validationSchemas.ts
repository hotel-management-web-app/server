import Joi from 'joi';

/**
 * @openapi
 * components:
 *  schemas:
 *    RoomType:
 *      type: object
 *      required:
 *        - name
 *        - occupancy
 *        - price
 *      properties:
 *        name:
 *          type: string
 *          default: Test Room
 *        description:
 *          type: string
 *          default: ''
 *        occupancy:
 *          type: number
 *          default: 3
 *        price:
 *          type: number
 *          default: 300000
 *        image:
 *          type: string
 *          default: ''
 *        images:
 *          type: array
 *          default: []
 *        amenities:
 *          type: array
 *          default: []
 *        details:
 *          type: array
 *          default: []
 */

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

/**
 * @openapi
 * components:
 *  schemas:
 *    Room:
 *      type: object
 *      required:
 *        - roomTypeId
 *        - floorNumber
 *        - roomNumber
 *      properties:
 *        roomTypeId:
 *          type: number
 *          default: 1
 *        floorNumber:
 *          type: number
 *          default: 3
 *        roomNumber:
 *          type: number
 *          default: 4
 */

export const roomSchema = Joi.object({
  roomStatus: Joi.string(),
  roomTypeId: Joi.number().required(),
  floorNumber: Joi.number().required(),
  roomNumber: Joi.number().required(),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    Booking:
 *      type: object
 *      required:
 *        - arrivalDate
 *        - departureDate
 *        - roomId
 *        - adults
 *        - children
 *        - guestId
 *      properties:
 *        arrivalDate:
 *          type: string
 *          default: 2023-03-24T10:04:03.022Z
 *        departureDate:
 *          type: string
 *          default: 2023-03-29T14:19:15.969Z
 *        roomId:
 *          type: number
 *          default: 1
 *        adults:
 *          type: number
 *          default: 1
 *        children:
 *          type: number
 *          default: 0
 *        guestId:
 *          type: number
 *          default: 1
 */

export const bookingSchema = Joi.object({
  status: Joi.string(),
  arrivalDate: Joi.date().required(),
  departureDate: Joi.date().required(),
  roomId: Joi.number().required(),
  adults: Joi.number().required(),
  children: Joi.number().required(),
  guestId: Joi.number(),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    Guest:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *      properties:
 *        firstName:
 *          type: string
 *          default: John
 *        lastName:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: johndoe@example.com
 *        phoneNumber:
 *          type: string
 *          default: 123456789
 *        notes:
 *          type: string
 *          default: ''
 */

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

/**
 * @openapi
 * components:
 *  schemas:
 *    AboutInfo:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *          default: Title
 *        description:
 *          type: string
 *          default: ''
 */

export const aboutInfoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    AboutDetail:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *          default: Title
 *        description:
 *          type: string
 *          default: ''
 */

export const aboutDetailSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    GeneralSettings:
 *      type: object
 *      required:
 *        - hotelName
 *        - country
 *        - email
 *        - phoneNumber
 *      properties:
 *        hotelName:
 *          type: string
 *          default: Hotel
 *        country:
 *          type: string
 *          default: USA
 *        email:
 *          type: string
 *          default: hotel@example.com
 *        phoneNumber:
 *          type: string
 *          default: 123456789
 */

export const generalSettingsSchema = Joi.object({
  hotelName: Joi.string().required(),
  country: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    ProfileInfo:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - phoneNumber
 *      properties:
 *        name:
 *          type: string
 *          default: Admin
 *        email:
 *          type: string
 *          default: admin@example.com
 *        phoneNumber:
 *          type: string
 *          default: 123456789
 */

export const profileInfoSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    Contact:
 *      type: object
 *      required:
 *        - firstName
 *        - secondName
 *        - email
 *        - subject
 *        - message
 *      properties:
 *        firstName:
 *          type: string
 *          default: John
 *        lastName:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: johndoe@example.com
 *        phoneNumber:
 *          type: string
 *          default: 123456789
 *        subject:
 *          type: string
 *          default: Subject
 *        message:
 *          type: string
 *          default: Message
 */

export const contactDataSchema = Joi.object({
  firstName: Joi.string().min(3).max(48).required(),
  secondName: Joi.string().min(3).max(48).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

export const bookingFormSchema = Joi.object({
  privacyTerms: Joi.boolean().required(),
  conditionsAndPolicies: Joi.boolean().required(),
  firstName: Joi.string().min(3).max(48).required(),
  lastName: Joi.string().min(3).max(48).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  notes: Joi.string().allow(''),
  roomTypeId: Joi.number(),
  arrivalDate: Joi.string(),
  departureDate: Joi.string(),
  adults: Joi.number(),
  children: Joi.number(),
});
