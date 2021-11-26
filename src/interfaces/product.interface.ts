import { Document, ObjectId } from 'mongoose';
export interface ProductInterface extends  Document{
    name: string;
    price: number;
    imgUrl:string;
    describe:string;
    complements:string;
    company:ObjectId;
    category:ObjectId
  }
