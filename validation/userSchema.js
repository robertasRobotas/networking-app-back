import Joi from "joi";

const userRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export { userRegistrationSchema };
