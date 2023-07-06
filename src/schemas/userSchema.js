import joi from "joi";
import { tlds } from '@hapi/tlds';

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
});

export function validateUser(user){
    const validation = userSchema.validate(user,  { abortEarly: false } );
    return (validation);
}