import { model, ObjectId} from "mongoose";
import mongoose from "mongoose";
import { CategoryInterface } from "../interfaces/category.interface";

const Schema = mongoose.Schema;
const CategoryData = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    lowercase: true
    
  },
  imgUrl: {
    type: String,
    required: [true, 'La imagen es obligatoria']
  }
  
});

CategoryData.methods.toJSON = function() {
    const {__v, ...category  } = this.toObject();
    return category;
  }
  
  
  export default model<CategoryInterface>('Category', CategoryData);