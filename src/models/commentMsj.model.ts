import { model } from "mongoose";
import mongoose from "mongoose";

export interface CommentInterface extends Document{
    firstName:string;
    email:string;
    msj:string;
    lastName:string;
    dateCreate: Date;
}


const Schema = mongoose.Schema;
const Comment = new Schema({
  firstName: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    lowercase: true
    
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    lowercase: true
  },
  msj: {
    type: String,
    required: [true, 'El msj es obligatorio'],
    lowercase: true,
    minlength: 20
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es obligatorio']
  },
  dateCreate:{
      type: Date,
      default:  Date.now()
  }
});
  
  
  export default model<CommentInterface>('Comment', Comment);