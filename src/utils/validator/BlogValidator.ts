import * as Joi from "joi";

export const CreateBlogSchema = Joi.object({
    title: Joi.string().min(10).max(70).required(),
    description: Joi.string().min(10).required(),
    author: Joi.string().required(),
    image: Joi.string().required(),
    //     userid: Joi.number().required(),
});
