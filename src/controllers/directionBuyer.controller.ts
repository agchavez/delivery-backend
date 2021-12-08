import { Request, Response } from 'express';

import Direction from '../models/directionBuyer.model';
import Company from '../models/company.model'

import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';
import { ObjectId } from 'bson';



//Obtener todas las categorias
export const getAllDirecion = async(req:Request, res:Response)=>{
    const {limit= 6,offset = 0, } = req.query;
    console.log(limit);
    
    const query = {};
    const directions = await Promise.all([
        Direction.find(query)
                .skip(Number(offset))
                .limit(Number(limit)),
        Direction.countDocuments(query)
    ])
    try{
    res.status(200).json({
        ok:true,
        directions
       
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

//Funcion para retornar una categoria por id

//agregar direction
export const postNewDirectionBuyer = async(req:Request, res:Response)=>{
    const {idBuyer, depto, muni,lat,long} = req.body;
    try {
        const directionBuyer = new Direction({ idBuyer, depto,muni,lat,long});
        await directionBuyer.save();

        res.status(201).json({
            ok:true,
            directionBuyer
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        })
    }
}


