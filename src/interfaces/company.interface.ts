import { Document, ObjectId } from 'mongoose';
export interface CompanyInterface extends  Document{
    name: string;
    phone: string;
    imgUrl: string;
    bannerUrl:string;
    _id:ObjectId;
    categories:any

  }
