import { model, ObjectId } from "mongoose";
import mongoose from "mongoose";
import { ProductInterface } from '../interfaces/product.interface';

const Schema = mongoose.Schema;
const Product= new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    lowercase: true
  },
  imgUrl: {
    type: [
        {
        type: String,
        required: [true, 'La url es obligatoria']
      }, ],
    require: [true, 'La imagen es obligatoria']
  },
  description: {
    type: String,
    required: [true, 'La descripcion es obligatoria']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio']
  },
  status:{
    type: Boolean,
    default: true
  },
  company:{
      type:Schema.Types.ObjectId, ref: 'Company',
      required:[true,'Id requerido']
  },
  category:{
    type:Schema.Types.ObjectId, ref: 'Category',
    required:[true,'Id requerido'],
},
createdAt:{
    type: Date,
    default: Date.now
},
  complemts: [
    {
      name: {
        type: String,
      },
      price:{
        type: Number
      }

    }
  ]
});

Product.methods.toJSON = function() {
    const { __v, ...company  } = this.toObject();
    return company;
  }
  
export default model<ProductInterface>('Product', Product);