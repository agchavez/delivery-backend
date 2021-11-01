
import { Request, Response } from 'express';

import Admin from '../models/admin.model';
import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';


export const  registerAdmin= async (req:Request, res:Response)=>{
    const {password, ...adminData} = req.body;
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    const passwordEncrip = bcryptjs.hashSync( password.toString(), salt );
    const admin = new Admin({...adminData, password: passwordEncrip});
    try {
        //Guardar el nuevo registro
        await admin.save();
        
        res.status(200).json({
            msj:true,
            id:admin._id,
            admin
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"Error al registrar administrador",
            error
        })       
    }   
}

//Obtener todos los admins
export const getAllAdmin = async(req:Request, res:Response)=>{
    const {limit= 5,offset = 1} = req.query;    
    const query = {state: true};
    const admins = await Promise.all([
        Admin.find(query)
                .skip(Number(offset))
                .limit(Number(limit)),
        Admin.countDocuments(query)
    ])
    res.status(200).json({
        ok:true,
        admins
    })

}