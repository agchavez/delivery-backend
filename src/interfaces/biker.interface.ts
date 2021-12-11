import { Document, ObjectId } from 'mongoose';
export interface BikerInterface extends  Document{
    firstName: string;
    lastName: string;
    password: string;
    identity:string;
    email: string;
    phone:number;
    status: boolean;
    verified:boolean;
    aprovated:boolean;
    code:Number;
    _id:ObjectId;
    dateCreate: Date;

  }
