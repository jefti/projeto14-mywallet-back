import { db } from "../app.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { validateUser } from "../schemas/userSchema.js";





export async function signup(req, res){
    try{
    const user = req.body;
    const validation = validateUser(user);
    if(validation.error) {
        const errors = validation.error.details.map((detail)=>detail.message)
        return res.status(422).send(errors);
    }
    const teste = await db.collection("users").findOne({email:user.email});
    if(teste) return res.status(409).send('email já cadastrado!');
    const passwrodhash = bcrypt.hashSync(user.password, 10);
    delete user.password;
    const novoUsuario = {...user, password: passwrodhash};
    await db.collection("users").insertOne(novoUsuario);
    return res.send('usuario cadastrado com sucesso !').status('201');
    } catch(err){
        res.sendStatus(500);
    }

}

export async function signin(req, res){
    const login = req.body;
    const user = await db.collection("users").findOne(login.email);
}