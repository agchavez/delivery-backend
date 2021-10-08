import JWT from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export const generateJWT =  async (uid:ObjectId)=>{
    return new Promise((resolve, reject) => {
        //Los datos que va contener el JWT
        const payload = {uid};

        JWT.sign(payload, process.env.JWT_KEY!, {
            expiresIn:'4h'
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject('Error al generar el jwt')
            }else{
                resolve(token)
            }
        })

    })
}