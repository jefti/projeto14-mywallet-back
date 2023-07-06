import cors from 'cors';
import express  from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

import { signup } from './controllers/userController.js';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
try{
    mongoClient.connect();
    console.log('Mongodb conectado!');
}catch (err){
    console.log(err.message);
}

export const db = mongoClient.db();

app.post("/sign-up", signup);

app.get('/ping', (req,res)=>{
    res.send('conectado ...');
})



const Port = 5000;
app.listen(Port, ()=> console.log(`Servidor rodando na porta ${Port}`));