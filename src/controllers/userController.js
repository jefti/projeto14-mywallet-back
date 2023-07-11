import  db  from '../database/database.connection.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { validateUser, validateLogin } from '../middlewares/validationSchema.js';


export async function getUsers(req, res){
    try{
        const users = await db.collection("users").find().toArray();
        return res.send(users);
    } catch(err){
        return res.sendStatus(500);
    }
}

export async function getSessions(req, res){
    try{
        const sessions = await db.collection("sessions").find().toArray();
        return res.send(sessions);
    } catch(err){
        return res.sendStatus(500);
    }
}


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
    return res.status('201').send('usuario cadastrado com sucesso !');
    } catch(err){
        return res.sendStatus(500);
    }

}

export async function signin(req, res){
    try{
        const login = req.body;
        const validation = validateLogin(login);
        if(validation.error) {
            const errors = validation.error.details.map((detail)=>detail.message)
            return res.status(422).send(errors);
        }
        const user = await db.collection("users").findOne({email:login.email});
        if(!user) return res.status(404).send('Email não cadastrado');
        const teste = bcrypt.compareSync(login.password, user.password);
        if(teste){
            const token = uuid();
            await db.collection("sessions").insertOne({userId: user._id,token});
            return res.send({...user, token}).status(200);
        }

        return res.status(401).send('Senha incorreta !');
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}
 export async function signout(req, res){
    try{
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if(!token) return res.sendStatus(401);

        const sessao = await db.collection("sessions").findOne({token});
        if(!sessao) return res.status(404).send('Token não encontrado!');
        await db.collection("sessions").deleteOne({token});
        return res.status(204).send('Usuario deslogado com sucesso !')
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
 }