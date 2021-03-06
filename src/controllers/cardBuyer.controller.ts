import { Request, Response } from 'express';

import Card from '../models/cardClient.model'

import { generateJWT } from '../helpers/jwt.helper';
import bcryptjs from 'bcryptjs';
import { ObjectId } from 'bson';



//Obtener todas las cards de un cliente
export const getAllCards = async(req:Request,res:Response)=>{
    // const products =  await Product.find({},{"company":req.params.idCompany}).populate({path:'category',model:'Category'}).populate({path:'company',model:'Company'})
     const cards = await  Card.aggregate([

         {
             $match: {
                 buyer: new ObjectId(req.params.idBuyer),
             }
         },

     ])
     try{
             res.status(200).json({
                 ok:true,
                 cards
                
             }) 
         }
             catch (error){
                 res.status(500).json({
                     ok:false,
                     msj:"server error",
                     error
                 }) 
 
             }}


//agregar nueva tarjeta
export const postNewCard = async(req:Request, res:Response)=>{
    const {number, expires, cvv, buyer,titular} = req.body;
    try{
       const card = new Card({number, expires, cvv, buyer,titular});
       await card.save();
       return res.status(201).json({
           ok:true,
           card
       })
    }catch  (error){
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
}

//eliminar card
export const deleteCard = async(req:Request, res:Response)=>{

    const idCard = new ObjectId(req.params.idCard);
    try{
       const response =  await Card.findByIdAndRemove(idCard);
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
