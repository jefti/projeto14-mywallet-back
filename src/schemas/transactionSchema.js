import joi from "joi";

export const transactionSchema = joi.object({
    value: joi.number().min(0).precision(2),
    description: joi.string().required(),
    type: joi.string().valid('entrada','saida').required()
});

