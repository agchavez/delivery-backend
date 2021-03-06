import { model, ObjectId } from "mongoose";
import mongoose from "mongoose";
import { CompanyInterface, } from '../interfaces/company.interface';

const Schema = mongoose.Schema;
const UserCompany = new Schema({
  phone: {
    type: String,
    required: [true, 'El telefono es obligatorio'],
    lowercase: true
    
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    lowercase: true
  },
  imgUrl: {
    type:String,
  },
  bannerUrl: {
    type:String
  },
  location: {
    type: Object,
    required: [true, 'La location es obligatoria']
  }
});

UserCompany.methods.toJSON = function() {
    const { __v, ...company  } = this.toObject();
    return company;
  }
  
export default model<CompanyInterface>('Company', UserCompany);