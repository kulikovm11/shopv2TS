import Joi from "joi";
import { IUser} from "../models";

const authValidator:Joi.ObjectSchema<IUser> = Joi.object({
    firstName:Joi.string().min(5).max(15).required().regex(/^[A-Za-z\s]{5,15}$/).messages({
        'string.pattern.base':'Only letters.',
        'string.min':'Minimum 5 symbols',
        'string.max':'Maximum 15 symbols',
        'string.empty': 'Field must not be empty!'
    }),
    lastName:Joi.string().min(5).max(15).required().regex(/^[A-Za-z\s]{5,15}$/).messages({
        'string.pattern.base':'Only letters.',
        'string.min':'Minimum 5 symbols',
        'string.max':'Maximum 15 symbols',
        'string.empty': 'Field must not be empty!'
    })
})

export {authValidator}
