import joi from "joi";

const transactionSchema = joi.object({
    value: joi.number().min(0).precision(2),
    description: joi.string().required(),
    type: joi.string().valid('entrada','saida').required()
});

export function validateTransaction(transaction){
    const validation = transactionSchema.validate(transaction,  { abortEarly: false } );
    console.log(validation.error)
    return (validation);
}