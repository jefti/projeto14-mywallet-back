import { userSchema, loginSchema } from "../schemas/userSchema.js";
import { transactionSchema } from "../schemas/transactionSchema.js";


export function validateTransaction(transaction){
    const validation = transactionSchema.validate(transaction,  { abortEarly: false } );
    console.log(validation.error)
    return (validation);
};

export function validateUser(user){
    const validation = userSchema.validate(user,  { abortEarly: false } );
    return (validation);
};

export function validateLogin(login){
   return loginSchema.validate(login, {abortEarly: false});
};