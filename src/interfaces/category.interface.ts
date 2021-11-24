import { Document, ObjectId } from 'mongoose';
export interface CategoryInterface extends  Document{
    name: string;
    _id: ObjectId;
    imgUrl: string;
  }
