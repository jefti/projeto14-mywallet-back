import cors from 'cors';
import express  from 'express';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import { MongoClient } from 'mongodb';
import router from './routes/routes.js';
import  db  from './database/database.connection.js';


const app = express();

app.use(cors());
app.use(express.json());




app.get('/ping', (req,res)=>{
    res.send('conectado ...');
})

/*app.post("/sign-up", signup);
app.post("/sign-in", signin);

app.get("/users",getUsers);
app.get("/sessions",getSessions);

app.post("/transaction", postTransaction);
app.get('/transaction', getTransaction);

app.delete("/sessions", signout);*/

app.use(router);

const Port = process.env.PORT || 5000;
app.listen(Port, ()=> console.log(`Servidor rodando na porta ${Port}`));