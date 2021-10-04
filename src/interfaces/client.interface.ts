import {Document } from  'mongoose';
export interface ClientInterface extends  Document{
    firtName: string;
    lastName: string;
    password: string;
    email: string;
    phone:number;
    status: boolean;
    imgUrl: string;
    verified:boolean;
    code:string;

  }
