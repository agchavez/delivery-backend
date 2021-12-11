import { Document, ObjectId } from 'mongoose';
export interface AdminInterface extends  Document{
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone:number;
    status: boolean;
    _id:ObjectId;
    dateCreate: Date;

  }
