import { model, ObjectId } from "mongoose";
import mongoose from "mongoose";
import { UbicationInterface,  } from '../interfaces/ubication.interface';

const Schema = mongoose.Schema;
const Ubication = new Schema({
  departament: {
    type: String,
    required: [true, 'El departamento es obligatorio'],
    //case: false
    
  },
  municipality: {
    type: Array,
    required:false
  }
});

Ubication.methods.toJSON = function() {
    const { __v, ...ubication  } = this.toObject();
    return ubication;
  }
  
export default model<UbicationInterface>('Ubication', Ubication);