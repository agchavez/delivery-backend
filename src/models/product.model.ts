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
    type: String,
    required: [true, 'La imagen es obligatoria']
  },
  describe: {
    type: String,
    required: [true, 'La descripcion es obligatoria']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio']
  },
  company:{
      type:Schema.Types.ObjectId, ref: 'Company',
      required:[true,'Id requerido']
  },
  category:{
    type:Schema.Types.ObjectId, ref: 'Category',
    required:[true,'Id requerido']
}
});

Product.methods.toJSON = function() {
    const { __v, ...company  } = this.toObject();
    return company;
  }
  
export default model<ProductInterface>('Product', Product);