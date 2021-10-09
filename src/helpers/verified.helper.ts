import { ObjectId } from 'mongoose';

import Client from '../models/client.model';
import Biker from '../models/biker.model';


export const checkEmailExist = async( email:string ) =>{
    const clientExist = await  Client.findOne({email});
    if (clientExist) {
            throw new Error(`El correo: ${ email }, ya está registrado`);
    } 
}

export const checkEmailExistByker =async(email:string)=>{
    const clientExist = await  Biker.findOne({email});
    if (clientExist) {
            throw new Error(`El correo: ${ email }, ya está registrado`);
    } 
}

export const checkClientById = async (id:ObjectId)=>{
    const clientExist = await Client.findById(id);
    if(!clientExist){
        throw new Error(`El id no es valido`);
    }
}