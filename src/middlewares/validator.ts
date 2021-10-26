const { validationResult } = require('express-validator');
import {Request, Response} from 'express';
import JWT from 'jsonwebtoken';
import bikerModel from '../models/biker.model';
import clientModel from '../models/client.model';

export const validator = ( req:Request, res:Response,next:any)=>{
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}

export const verifyTokenClient = async (req:Request, res:Response, next:Function)=>{
    const token:string = req.header('x-token') || "";
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:"No hay token en la peticion"
        }); 
    }
    try {
        const {uid}:any = JWT.verify(token, process.env.JWT_KEY!);
        req.body.uid = uid;
        const user = await clientModel.findById(uid);
                            
        if(!user){
            res.status(401).json({
                ok:false,
                msj:"El token no es valido"
            })
        }
        if(!user?.status){
            res.status(401).json({
                ok:false,
                msj:"El token no es valido - usuario eliminado"
            })
        }
    } catch (error) {
        return res.status(401).json({
            msg:"Token no valido"
        });
    }
    next();
}
export const verifyTokenAdmmin =  async (req:Request, res:Response, next:Function)=>{
    const token:string = req.header('x-token') || "";
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:"No hay token en la peticion"
        }); 
    }
    next();
}

export const verifyTokenBiker = async (req:Request, res:Response, next:Function)=>{
    const token:string = req.header('x-token') || "";
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:"No hay token en la peticion"
        }); 
    }
    try {
        const {uid}:any = JWT.verify(token, process.env.JWT_KEY!);
        req.body.uid = uid;
        
        const user = await bikerModel.findById(uid);
        
        if(!user){
            res.status(400).json({
                ok:false,
                msj:"El token no es valido - usuario no existe"
            })
        }
        if(user?.aproved){
            res.status(400).json({
                ok:false,
                msj:"El token no es valido - usuario no aprovado"
            })
        }
        if(!user?.status){
            res.status(400).json({
                ok:false,
                msj:"El token no es valido - usuario eliminado"
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            msg:"Token no valido",
            error
        });
    }
}

