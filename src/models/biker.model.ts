import { model, ObjectId } from "mongoose";
import mongoose from "mongoose";

interface InfoByker extends Document{
  imgLicense: string,
  imgCard  : string,
}
export interface BikerInterface extends Document{
    firstName:string;
    email:string;
    identity:number
    phone:number;
    describe:string;
    password:string;
    lastName:string;
    status: boolean;
    aproved: boolean;
    verified:boolean;
    imgUrl:string;
    _id:ObjectId;
    code: string;
    dateCreate: Date;
    info: InfoByker
}


const Schema = mongoose.Schema;
const UserBiker = new Schema({
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
  identity: {
    type: Number,
    required: [true, 'El numero de identidad es obligatorio']
  },
  phone: {
    type: Number,
    required: [true, 'El numero de telefono es obligatorio']
  },
  describe: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es obligatorio']
  },
  status: {
    type: Boolean,
    default: true
  },
  aproved: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  imgUrl: {
    type: String
  },
  code: {
    type: Number
  },
  dateCreate:{
      type: Date,
      default:  Date.now()
  },
  info: {
    imgLicense: {
      type: String
    },
    imgCard: {
      type: String
    }
  }
});

UserBiker.methods.toJSON = function() {
    const { __v, password,_id,dateCreate,code, ...biker  } = this.toObject();
    return biker;
  }
  
export default model<BikerInterface>('Biker', UserBiker);