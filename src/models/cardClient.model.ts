import { model, ObjectId} from "mongoose";
import mongoose from "mongoose";
import { CardClientInterface } from "../interfaces/cardClient.interface";

const Schema = mongoose.Schema;
const CardData = new Schema({
  number: {
    type: String,
    required: [true, 'El numero es obligatorio'],
    lowercase: true
    
  },
  expires: {
    type: String,
    required: [true, 'la fecha es obligatoria']
  },
  cvv: {
    type: Number,
    required: [true, 'el codigo es obligatorio']
  },
  titular: {
    type: String,
    required: [true, 'el titular es obligatorio']
  },
  buyer:
   {type: Schema.Types.ObjectId, ref: 'Client'}
  
  
});

CardData.methods.toJSON = function() {
    const {__v, ...category  } = this.toObject();
    return category;
  }
  
  
  export default model<CardClientInterface>('Card', CardData);