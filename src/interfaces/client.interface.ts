import { Document, ObjectId } from 'mongoose';
export interface ClientInterface extends  Document{
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone:number;
    status: boolean;
    imgUrl: string;
    verified:boolean;
    code:number;
    _id:ObjectId;
    dateCreate: Date;

  }
