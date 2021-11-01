import { ObjectId } from 'mongoose';

import Client from '../models/client.model';
import Biker from '../models/biker.model';
import Admin from '../models/admin.model';



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
    const clientExist = await  Biker.findOne({email});
    if (clientExist) {
            throw new Error(`El correo: ${ email }, no está registrado`);
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