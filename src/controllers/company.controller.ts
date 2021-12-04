//getCategorytById

import { Request, Response } from 'express';

import Company from '../models/company.model';
import Category from '../models/category.model';
import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';
import { Mongoose } from 'mongoose';

//obtener empresas
export const getAllCompany = async(req:Request, res:Response)=>{
    const {limit= 5,offset = 1, } = req.query;
    console.log(limit);
    
    const query = {state: true};
    const companies = await Promise.all([
        Company.find(query)
                .skip(Number(offset))
                .limit(Number(limit)),
        Company.countDocuments(query)
    ])
    try{
        res.status(200).json({
            ok:true,
            companies
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

//obtener una empresa
export const getCompany = async(req:Request,res:Response)=>{
    
    const query = {};
    const company =  await Company.findById(req.params.idCompany)

    try{
        res.status(200).json({
            ok:true,
            company
           
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
//agregar empresas de una categoria
export const putNewComapany = async(req:Request, res:Response)=>{
    const {idCompany} = req.body;
    const {idCategory} = req.params;

    try {
        const category = await Category.findById(idCategory);
        if(!category){
            return res.status(400).json({
                ok:false,
                msj:"Categoria no encontrada"
            })
        }
        category.companies.push(idCompany);
        await category.save();
        res.status(200).json({
            ok:true,
            category
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
}

//agregar nueva empresa
export const postNewCompany = async(req:Request, res:Response)=>{
    const {phone, name, imgUrl, bannerUrl} = req.body;
    try{
       const company = new Company({phone, name, imgUrl, bannerUrl});
       await company.save();
       return res.status(201).json({
           ok:true,
           company
       })
    }catch  (error){
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
}