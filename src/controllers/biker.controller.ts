import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import Biker from '../models/biker.model';
import { sendEmailVerified } from "../helpers/mail.helper";
import { generateJWT } from "../helpers/jwt.helper";


export const  registerBiker = async (req:Request, res:Response)=>{
    const {password, ...bikerData} = req.body;
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    const passwordEncrip = bcryptjs.hashSync( password.toString(), salt );
    const code = Math.ceil(Math.random() * (99999 - 10000) + 10000);
    const biker = new Biker({...bikerData, password: passwordEncrip, code:code});
    sendEmailVerified(biker.firstName, biker.email, code);
    
    try {
        //Guardar el nuevo registro
        await biker.save();

        res.status(200).json({
            msj:true,
            id:biker._id,
            biker
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"Error al registrar cliente",
            error
        })       
    }   
}


export const loginBiker = async(req:Request, res:Response)=>{
    const {email, password } = req.body
    try {
        const biker = await Biker.findOne({email:email.toLowerCase()});
        if (!biker) {
            return res.status(400).json({
                ok:false,
                msj:`El correo ${email}, no esta registrado`
            });
        }
        //Verificar si la contraseña coincide
        const validPassword = bcryptjs.compareSync(password, biker.password);
        if(!validPassword){
            return res.status(400).json({
                msg:"La contraseña es incorrecta"
            })
        }
        if(!biker.verified){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta aun no ha sido verificada"
            })
        }
        if(!biker.validate){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta aun no ha sido validada"
            })
        }
        if(!biker.status){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta ha sido eliminada"
            })
        }
        //Obtener token
        const token = await generateJWT(biker._id);
        res.status(200).json({
            msj: "ok",
            biker,
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

export const checkBiker = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {code} = req.body;
    try {
        var biker = await Biker.findById(id);
        if(biker?.verified){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta ya ha sido verificada"
            })
        }
        if(biker?.code === code){
            biker =  await Biker.findByIdAndUpdate(id, {verified: true} );
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
