import { Request, Response } from 'express';

export const loginClient = (req:Request, res:Response)=>{
    res.status(200).json({
        msj:true
    });
}

export const registerClient = (req:Request, res:Response)=>{
    res.status(200).json({
        msj:true
    });
}