import { Document, ObjectId } from 'mongoose';
export interface UbicationInterface extends  Document{
    departament: string;
    _id: ObjectId;
    municipality: any;
    
  }
