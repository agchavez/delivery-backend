import JWT from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { Request, Response} from 'express'
import clientModel from '../models/client.model';

export const generateJWT =  async (uid:ObjectId)=>{
    return new Promise((resolve, reject) => {
        //Los datos que va contener el JWT
        const payload = {uid};

        JWT.sign(payload, process.env.JWT_KEY!, {
            expiresIn:'6h'
        }, (err, token) =>{
            if(err){
                reject('Error al generar el jwt')
            }else{
                resolve(token)
            }
        })

    })
}

