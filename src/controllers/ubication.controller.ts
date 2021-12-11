//getCategorytById

import { Request, Response } from 'express';
import Ubication from '../models/ubication.model';
import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';
import { Mongoose, ObjectId } from 'mongoose';

//obtener una locations
export const getAllUbications = async(req:Request, res:Response)=>{
   // const {limit= 5,offset = 1, } = req.query;    
    const query = {};
    const ubications = await Promise.all([
        Ubication.find(query),
               // .skip(Number(offset))
                //.limit(Number(limit)),
        Ubication.countDocuments(query)
    ])
    try{
        res.status(200).json({
            ok:true,
            ubications
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



//agregar ubicacion
export const postNewLocation= async(req:Request, res:Response)=>{
    const {departament, municipality} = req.body;
    try{
       const ubication = new Ubication({departament, municipality});
       await ubication.save();
       return res.status(201).json({
           ok:true,
           ubication
       })
    }catch  (error){
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
}

//agregar municipio
export const putMunicipaly= async(req:Request, res:Response)=>{
    const idUbication = req.params.idUbicacion;


    try{
        const ubication = await Ubication.findById(idUbication);
        if(!ubication){
            return res.status(400).json({
                ok:false,
                msj:"Ubicacion no encontrada"
            })
        }
        ubication.municipality.push(req.body);
        await ubication.save();
        res.status(200).json({
            ok:true,
            ubication
        })
    }catch  (error){
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
}
