//getCategorytById

import { Request, Response } from 'express';

import Company from '../models/company.model';
import Category from '../models/category.model';
import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';
import { Mongoose } from 'mongoose';
import { uploadImg, updateImage } from '../helpers/cloudinary';
import { ObjectId } from 'bson';

//obtener empresas
export const getAllCompany = async(req:Request, res:Response)=>{
    const {limit= 4,offset = 0, } = req.query;
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
//Obtener nombre de empresa

export const getCompanyName = async (req: Request, res: Response) => {
  
    try {
        //Obtener el logo de la empresa segun el producto
        const company = await Company.findById(req.params.idCompany,{name:true})
        res.status(200).json(company);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: 'Error al listar la empresa',
            error
        });
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
interface MulterRequest extends Request {
    files: any;
}
//agregar nueva empresa
export const postNewCompany = async(req:Request, res:Response)=>{
    const {imgLogoFile, imgBannerFile} = (req as MulterRequest ).files;
    var imgUrl:string;
    var bannerUrl:string;
    const {phone, name,lat,long,description} = req.body;
    const location={
        lat:lat,
        long:long,
        description:description
    }
    try{
         //Subir imagen a Cloudinary
         imgUrl = await uploadImg(imgLogoFile,  'company/logo');
         bannerUrl = await uploadImg(imgBannerFile, 'company/banner')
       const company = new Company({phone, name, imgUrl, bannerUrl,location});
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

//eliminar una empresa
export const deleteCompany = async(req:Request, res:Response)=>{

    const idCompany = new ObjectId(req.params.idCompany);
    try{
       const response =  await Company.findByIdAndRemove(idCompany);
       //await company.save();
       return res.status(201).json({
           ok:true,
           response
       })
    }catch  (error){
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
}
