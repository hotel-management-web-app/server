import { Response } from 'express';
import Joi from 'joi';

class Validator {
  private schema: Joi.ObjectSchema = Joi.object({});
  private payload: object = {};

  constructor(schema: Joi.ObjectSchema, payload: object) {
    this.schema = schema;
    this.payload = payload;
  }

  validate() {
    return this.schema.validate(this.payload, { abortEarly: false });
  }

  showErrors(res: Response) {
    const { error } = this.validate();
    if (error) {
      res.status(400).send(error.details);
      return;
    }
  }
}

export default Validator;
