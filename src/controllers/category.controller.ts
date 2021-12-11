import { Request, Response } from 'express';

import Category from '../models/category.model';
import Company from '../models/company.model'

import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';
import { ObjectId } from 'bson';



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

//Funcion para retornar una categoria por id


export const postNewCategory = async(req:Request, res:Response)=>{
    const {name, imgUrl} = req.body;
    try {
        const category = new Category({name, imgUrl});
        await category.save();

        res.status(201).json({
            ok:true,
            category
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        })
    }
}
export const getCompanyById = async(req:Request, res:Response)=>{
    //localhost:8080/v1/companie/54564654?limit=10&offset=10
        const query = {};
    const category =  await Category.findById("61a067614d3a4f04bcb5272a").populate({path:'companies', model:'Company'})
    //     Category.aggregate([

    //     {
    //         $lookup: {
    //             from: "Company",
    //             localField: "companies",
    //             foreignField: "_id",
    //             as: "result"
    //         }


    //     },
    //     // {
    //     //     $unwind: '$companies'
    //     //   },
    //     // {
    //     //     $match: {
    //     //         _id: new ObjectId("619d1ec55b79204b95c57795"),
    //     //     }
    //     // },
    //     {
    //         $project: {
    //             _id: true,
    //             name: true,
    //             companies:true,
    //             "result":true
    //         }
    //     }
    // ])

    try{
    res.status(200).json({
        ok:true,
        category
       
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

