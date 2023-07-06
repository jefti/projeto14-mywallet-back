import cors from 'cors';
import express  from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

import { signin, signup, getUsers, getSessions } from './controllers/userController.js';

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

app.get('/ping', (req,res)=>{
    res.send('conectado ...');
})

app.post("/sign-up", signup);
app.post("/sign-in", signin);

app.get("/users",getUsers);
app.get("/sessions",getSessions);



const Port = 5000;
app.listen(Port, ()=> console.log(`Servidor rodando na porta ${Port}`));