import { Request, Response } from 'express';

import { Mongoose,Schema } from 'mongoose';
import Product from '../models/product.model';
import Company from '../models/company.model';
import Category from '../models/category.model';

import { ObjectId } from 'bson';

import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';

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
                productos:{$push:{
                    name:"$name",
                    price:"$price",
                    describe:"$describe",
                    imgUrl:"$imgUrl"
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
    const companies = await  Product.aggregate([

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
                category: req.params.idCat,
            }
        },
        
        {
            $group: { 
                _id: {$first:"$cate.name"},
                empresas:{$push:{
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
    const {name, price,imgUrl,describe} = req.body;
    const company=req.params.company;
    const category = req.params.category
    try {
        const product = new Product({name,price, imgUrl,describe,company,category});
        
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