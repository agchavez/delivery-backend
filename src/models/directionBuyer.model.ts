import { model, ObjectId} from "mongoose";
import mongoose from "mongoose";
import { directionBuyerInterface } from '../interfaces/directionBuyer.interface';

const Schema = mongoose.Schema;
const directionBuyer = new Schema({
  depto: {
    type: String,
    required: [true, 'El departamento es obligatorio'],
    lowercase: false
    
  },
  muni: {
    type: String,
    required: [true, 'El municipio es obligatorio'],
    lowercase: false
    
  },
  lat: {
    type: Number,
    required: [true, 'La latitud es obligatorio']
  },
  long:{
    type: Number,
    required: [true, 'La longitud es obligatorio']
  },
  idBuyer:  {type: Schema.Types.ObjectId, ref: 'Client'}
  ,
  
});

directionBuyer.methods.toJSON = function() {
    const {__v, ...direction  } = this.toObject();
    return direction;
  }
  
  
  export default model<directionBuyerInterface>('Direction', directionBuyer);