import { Request, Response } from 'express';

import { Mongoose,Schema } from 'mongoose';
import Product from '../models/product.model';
import Company from '../models/company.model';
import Category from '../models/category.model';

import { ObjectId } from 'bson';

import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { uploadImg } from '../helpers/cloudinary';

//obtener productos de empresa
export const getProductByCompany = async(req:Request,res:Response)=>{
   // const products =  await Product.find({},{"company":req.params.idCompany}).populate({path:'category',model:'Category'}).populate({path:'company',model:'Company'})
    const products = await  Product.aggregate([

        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "cat"
            },

        },
        {
            $match: {
                company: new ObjectId(req.params.idCompany),
            }
        },
        {
            $group: { 
                _id: {$first:"$cat.name"},
                idCat:{$first:"$cat._id"},

                productos:{$push:{
                    name:"$name",
                    price:"$price",
                    describe:"$description",
                    imgUrl:"$imgUrl",
                    complemts:"$complemts"

                }} 
            },
        },
    ])
    try{
            res.status(200).json({
                ok:true,
                products
               
            }) 
        }
            catch (error){
                res.status(500).json({
                    ok:false,
                    msj:"server error",
                    error
                }) 

            }}


            //obtener productos de una empresa y una categoria

export const getProductByCat = async(req:Request,res:Response)=>{
    // const products =  await Product.find({},{"company":req.params.idCompany}).populate({path:'category',model:'Category'}).populate({path:'company',model:'Company'})
     const products = await  Product.aggregate([
 
         {
             $lookup: {
                 from: "categories",
                 localField: "category",
                 foreignField: "_id",
                 as: "cat"
             },
 
         },
         {
             $match: {
                 company: new ObjectId(req.params.idCompany),
                 category:new ObjectId(req.params.idCate)
             }
         },
         {
             $group: { 
                 _id: {$first:"$cat.name"},
                 productos:{$push:{
                     name:"$name",
                     price:"$price",
                     describe:"$description",
                     imgUrl:"$imgUrl",
                     complemts:"$complemts"
                 }} 
             },
         },
        
     ])
     try{
             res.status(200).json({
                 ok:true,
                 products
                
             }) 
         }
             catch (error){
                 res.status(500).json({
                     ok:false,
                     msj:"server error",
                     error
                 }) 
 
             }}
//obtener empresas de una categoria
export const getCompanyByCat= async(req:Request,res:Response)=>{
    const companies = await Product.aggregate([

        {
            $lookup: {
                from: "companies",
                localField: "company",
                foreignField: "_id",
                as: "comp"
            },

        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "cate"
            },

        },
        {
            $match: {
                category: new ObjectId(req.params.idCat),
            }
        },
        {
            $group: { 
                _id: {$first:"$cate.name"},
                empresas:{$addToSet:{
                    id:{$first:"$comp._id"},
                    name:{$first:"$comp.name"},
                    imgUrl:{$first:"$comp.imgUrl"},

                }} 
            },
        },
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



export const postNewProduct = async(req:Request, res:Response)=>{
    const {
        name, description, price, company, category, complemts
    } = req.body;
    const imgs = req.files;
    var complemtsArray = [] ;
    if(complemts){
        complemtsArray = JSON.parse(complemts)["complements"];
    }
    try {
        const imgUrl = [];
        if (imgs !== undefined) {
            for (const key in imgs) {
                const url = await uploadImg(imgs[key], 'products');
                imgUrl.push(url)
            }
        }
        const product = new Product({name,price, description,company,category, imgUrl, complemts:complemtsArray});
        await product.save();
        
        res.status(200).json({
            ok:true,
            product
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        })
    }
}

//Obtener todos los productos con paginacion 
export const getAllProducts = async(req:Request, res:Response)=>{
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const createdAt = req.query.createdAt || 1;
    const {status} = req.query || true;
    
    const products = await Product.find({status})
                                .skip((page-1)*limit)
                                .limit(limit)
                                .sort({createdAt:createdAt})
                                .populate({path:'company',model:'Company'})
                                .populate({path:'category',model:'Category'})
    try {
        res.status(200).json({
            ok:true,
            products
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        })
    }
}

//Eliminar producto cambiando el valor de status a false
export const deleteProduct = async(req:Request, res:Response)=>{
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id,{status:false},{new:true});
        res.status(200).json({
            ok:true,
            msj:"Producto eliminado",
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        })
    }
}

//Actualizar ciertos campos de un producto, segun el id 
export const updateProduct = async(req:Request, res:Response)=>{
   
}
