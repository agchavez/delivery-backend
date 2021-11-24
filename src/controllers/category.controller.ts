import { Request, Response } from 'express';

import Category from '../models/category.model';

import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';


//Obtener todas las categorias
export const getAllCategory = async(req:Request, res:Response)=>{
    const {limit= 6,offset = 0, } = req.query;
    console.log(limit);
    
    const query = {};
    const categories = await Promise.all([
        Category.find(query)
                .skip(Number(offset))
                .limit(Number(limit)),
        Category.countDocuments(query)
    ])
    try{
    res.status(200).json({
        ok:true,
        categories
       
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

