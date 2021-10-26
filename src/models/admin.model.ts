import { model, ObjectId } from "mongoose";
import mongoose from "mongoose";

export interface BikerInterface extends Document{
    firstName:string;
    email:string;
    password:string;
    lastName:string;
    status: boolean;
    _id:ObjectId;
    dateCreate: Date;
}

const Schema = mongoose.Schema;
const Administrator = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  dateCreate:{
    type: Date,
    default:  Date.now()
}
});

Administrator.methods.toJSON = function() {
    const { __v, password,_id,dateCreate, ...biker  } = this.toObject();
    return biker;
  }
  
  
  export default model<BikerInterface>('Biker', Administrator);