import { db } from "../app.js";
import { validateTransaction } from "../schemas/transactionSchema.js";

export async function postTransaction(req,res){
    try{
        //value, description, type, userId
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if(!token) return res.sendStatus(401);

        const transactionReq = req.body;
        const validation = validateTransaction(transactionReq);
        if(validation.error){
            const errors = validation.error.details.map((detail)=> detail.message);
            return res.status(422).send(errors);
        }

        const sessao = await db.collection("sessions").findOne({token});

        if(!sessao) return res.sendStatus(422);

        const newTrasaction = {
            value: transactionReq.value, 
            description: transactionReq.description,
            type: transactionReq.type,
            userId: sessao.userId
        };
        await db.collection("transactions").insertOne(newTrasaction);
        return res.sendStatus(200);
    }catch (err){
        console.log(err);
        return res.send(500);
    }
}

export async function getTransaction(req, res){
    try{
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if(!token) return res.sendStatus(401);
        const session = await db.collection("sessions").findOne({token});
        if (!session) return res.sendStatus(401);

        const transactions = await db.collection("transactions").find({userId: session.userId}).toArray();
        return res.send(transactions);
    } catch(err){
        return res.sendStatus(500);
    }
}