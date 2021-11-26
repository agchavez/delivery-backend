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
        // {
        //     $group: { 
        //         "cat._id": "$a", 
        //     },
        //     $sort:{a:1}
        // },
        {
            $project: {
                name:true,
                describe:true,
                price:true,
                imgUrl:true,
                "cat._id": true,
                "cat.name": true


            }

        }
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
                category: new ObjectId(req.params.idCat),
            }
        },
        {
            $project: {
                "comp._id": true,
                "comp.name": true,
                "comp.imgUrl": true,
                "cate.name":true


            }

        }
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