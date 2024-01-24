import * as Joi from "joi";

export const CreateRegisterSchema = Joi.object({
    fullname: Joi.string().min(4).max(30).required(),
    address: Joi.string().required(),
    sex: Joi.string().required(),
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(8).required(),
});
