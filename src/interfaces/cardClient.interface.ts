import { Document, ObjectId } from 'mongoose';
export interface CardClientInterface extends  Document{
    number: string;
    _id: ObjectId;
    expires: string;
    cvv:number;
    buyer:ObjectId
  }
