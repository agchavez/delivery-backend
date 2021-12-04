import { Document, ObjectId } from 'mongoose';
export interface directionBuyerInterface extends  Document{
    depto: string;
    muni:string;
    lat: string;
    long: string;
    idBuyer:ObjectId;
    _id:ObjectId;
  }
