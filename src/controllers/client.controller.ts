import { Request, Response } from 'express';

import Client from '../models/client.model';
import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';
import { sendEmailVerified } from '../helpers/mail.helper';

export const  registerClient = async (req:Request, res:Response)=>{
    const {password, ...clientData} = req.body;
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    const passwordEncrip = bcryptjs.hashSync( password.toString(), salt );
    const code = Math.ceil(Math.random() * (99999 - 10000) + 10000);
    const client = new Client({...clientData, password: passwordEncrip, code:code});
    try {
        //Guardar el nuevo registro
        await client.save();
        
        sendEmailVerified(client.firstName, client.email, code);
        
        res.status(200).json({
            msj:true,
            id:client._id,
            client
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"Error al registrar cliente",
            error
        })       
    }   
}

export const loginClient = async(req:Request, res:Response)=>{
    const {email, password } = req.body
    try {
        const client = await Client.findOne({email:email.toLowerCase()});
        if (!client) {
            return res.status(400).json({
                ok:false,
                msj:`El correo ${email}, no esta registrado`
            });
        }
        //Verificar si la contraseña coincide
        const validPassword = bcryptjs.compareSync(password, client.password);
        if(!validPassword){
            return res.status(400).json({
                msg:"La contraseña es incorrecta"
            })
        }
        if(!client.verified){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta aun no ha sido verificada"
            })
        }
        if(!client.status){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta ha sido eliminada"
            })
        }
        //Obtener token
        const token = await generateJWT(client._id);
        res.status(200).json({
            msj: "ok",
            client,
            token
        }) 
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })  
    }
}

//Obtener todos los usuarios
export const getAllClient = async(req:Request, res:Response)=>{
    const {limit= 5,offset = 1, verified} = req.query;    
    console.log( Boolean(verified));
    
    const query = {state: true, verified: Boolean(verified)};
    const clients = await Promise.all([
        Client.find(query)
                .skip(Number(offset))
                .limit(Number(limit)),
        Client.countDocuments(query)
    ])
    res.status(200).json({
        ok:true,
        clients
    })

}
export const getClientById = async(req:Request, res:Response)=>{
    const id = req.params.id;
    const client = await Client.findById(id);
    if (!client) {
        return res.status(400).json({
            ok:false,
            msj:"Usuario no encontrado"
        })
    }
    if(!client?.status){
        return res.status(400).json({
            ok:false,
            msj:"Usuario eliminado"
        })
    }

    res.status(200).json({
        ok:true,
        client
    })
}
export const checkClient = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {code} = req.body;
    try {
        var client = await Client.findById(id);
        if(client?.verified){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta ya ha sido verificada"
            })
        }
        if(client?.code === code){
            client =  await Client.findByIdAndUpdate(id, {verified: true} );
            res.status(200).json({
                ok:true,
                msj:"Correo electronico verificado"
            })
        }
        res.status(400).json({
            ok:false,
            msj:"El codigo no es valido"
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        }) 
    } 
}

export const postRestoreByEmail = async (req:Request, res:Response)=>{
    const {email} = req.body;
    try {

        //TODO: generar codigo de verificacion
        
        //TODO: Guardar codigo de verificacion
    
        //TODO: Enviar correo electronico

        return res.status(200).json({
            ok:true,
            email
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        }) 
        
    }
}
export const getRestoreCheckCode = async (req:Request, res:Response)=>{
    const {code} = req.body;
    const {id} = req.params;

    try {

        //TODO: obtener usuario por id
        
        //TODO: verificar los codigos
    
        //TODO: eliminar codigo

        return res.status(200).json({
            ok:true,
            //user
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        }) 
        
    }
}
export const putRestoreNewPassword = async (req:Request, res:Response)=>{
    const {password} = req.body;
    const {id} = req.params;

    try {

        //TODO: obtener usuario por id
        
        //TODO: encriptar contraseña
    
        //TODO: actualizar cambios 

        return res.status(200).json({
            ok:true,
            //user
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        }) 
        
    }
}

export const verified = async (req:Request, res:Response)=>{

    //Actualizar el token del usuario
    res.status(200).json({
        ok:true
    })
}