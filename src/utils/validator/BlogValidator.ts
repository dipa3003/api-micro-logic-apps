import * as Joi from "joi";

export const CreateBlogSchema = Joi.object({
    title: Joi.string().min(10).max(70).required(),
    description: Joi.string().min(10).required(),
    image: Joi.string().required(),
    userId: Joi.number().required(),
    author: Joi.string().required(),
});
