import { model, ObjectId } from "mongoose";
import mongoose from "mongoose";
import { AdminInterface } from "../interfaces/admin.interface";

const Schema = mongoose.Schema;
const Administrator = new Schema({
  email: {
    type: String,
    required: true,
    unique:true,
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
  phone: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  dateCreate:{
    type: Date,
    default:  Date.now()
}
});

Administrator.methods.toJSON = function() {
    const { __v, password, ...admin  } = this.toObject();
    return admin;
  }
  
  
  export default model<AdminInterface>('Admin', Administrator);