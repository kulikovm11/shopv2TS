import Joi from "joi";
import {IProduct} from "../models";




const productValidator:Joi.ObjectSchema<IProduct> = Joi.object({
    title:Joi.string().regex(/^[A-Za-z0-9\s]+$/).required().messages({
        'string.pattern.base':'Only letters and digits.',
        'string.empty': 'Field must not be empty!'
    }),
    description:Joi.string().min(5).max(200).required().messages({
        'string.min':'Minimum 5 symbols',
        'string.max':'Maximum 200 symbols',
        'string.empty': 'Field must not be empty!'
    }),
    price:Joi.number().min(0.1).max(2000).required().messages({
        'number.min':'Should be greater or equal to 1 cent',
        'number.max':'Should be smaller or equal to 2000$',
        'number.empty': 'Field must not be empty!'
    })
})


export {productValidator}
