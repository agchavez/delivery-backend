
import { Request, Response } from 'express';

import Admin from '../models/admin.model';
import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';


//Login admin
export const loginAdmin = async(req:Request, res:Response)=>{
    const {email, password } = req.body
    try {
        const admin = await Admin.findOne({email:email.toLowerCase()});
        if (!admin) {
            return res.status(400).json({
                ok:false,
                msj:`El correo ${email}, no esta registrado`
            });
        }
        //Verificar si la contraseña coincide
        const validPassword = bcryptjs.compareSync(password, admin.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:"La contraseña es incorrecta"
            })
        }
        if(!admin.status){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta ha sido eliminada"
            })
        }
        //Obtener token
        const token = await generateJWT(admin._id);
        res.status(200).json({
            ok:true,
            msj: "ok",
            admin,
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

//Registrar nuevo admin
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
    try{
    res.status(200).json({
        ok:true,
        admins
    })
}
    catch (error){
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        }) 
    }

}