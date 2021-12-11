import { ObjectId } from 'mongoose';

import Client from '../models/client.model';
import Biker from '../models/biker.model';
import Admin from '../models/admin.model';
import Product from '../models/product.model';



export const checkEmailExist = async( email:string ) =>{
    const clientExist = await  Client.findOne({email});
    if (clientExist) {
            throw new Error(`El correo: ${ email }, ya está registrado`);
    } 
}

export const checkEmailExistAdmin = async( email:string ) =>{
    const adminExist = await  Admin.findOne({email});
    if (adminExist) {
            throw new Error(`El correo: ${ email }, ya está registrado`);
    } 
}


export const checkNotEmailExistClient = async( email:string ) =>{
    const clientExist = await  Client.findOne({email});
    if (!clientExist) {
            throw new Error(`El correo: ${ email }, no está registrado`);
    }
}

export const checkEmailExistByker =async(email:string)=>{
    const clientExist = await  Biker.findOne({email});
    
    if (clientExist) {
            throw new Error(`El correo: ${ email }, ya está registrado`);
    } 
}

export const checkEmailNotExistByker =async(email:string)=>{
    console.log(email);
    
    const clientExist = await  Biker.findOne({email});
    if (!clientExist) {
            throw new Error(`El correo: ${ email }, no está registrado`);
    } 
}

//Comporobar si el id del producto existe
export const checkProductExist = async( id:string ) =>{
    const productExist = await  Product.findById(id);
    if (!productExist) {
            throw new Error(`El producto con id: ${ id }, no existe`);
    } 
}

export const checkBikerById = async (id:ObjectId)=>{
    const bikerExist = await Biker.findById(id);
    
    if(!bikerExist){
        throw new Error(`El id no es valido`);
    }
}
export const checkClientById = async (id:ObjectId)=>{
    const clientExist = await Client.findById(id);
    
    if(!clientExist){
        throw new Error(`El id no es valido`);
    }
}