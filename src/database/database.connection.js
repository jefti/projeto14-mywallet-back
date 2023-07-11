import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL);
try{
    mongoClient.connect();
    console.log('Mongodb conectado!');
}catch (err){
    console.log(err.message);
}

const db = mongoClient.db();
export default db;