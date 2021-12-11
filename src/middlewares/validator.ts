const { validationResult } = require('express-validator');
import {Request, Response} from 'express';
import JWT from 'jsonwebtoken';
import bikerModel from '../models/biker.model';
import clientModel from '../models/client.model';

export const validator = ( req:Request, res:Response,next:any)=>{
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}

