import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import Biker from '../models/biker.model';
import { sendEmailVerified } from "../helpers/mail.helper";


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
