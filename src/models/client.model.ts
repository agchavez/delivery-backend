import mongoose  from "mongoose";
import { ClientInterface } from '../interfaces/client.interface';
const { Schema, model } = mongoose;

//Modelo para los usuarios clientes
const UserClient = new Schema({
      firstName: {
        type: String,
        lowercase:true,
        required: [true, 'El nombre del usuario es obligatorio']
      },
      lastName: {
        type: String,
        lowercase:true,
        required: [true, 'El nombre del usuario es obligatorio']
      },
      phone: {
        type: Number,
        validate: {
          validator: function (v:number) {
            console.log(/[398]{1}\d{7}$/g.test(v.toString()));
            
          return /[398]{1}\d{7}$/g.test(v.toString())
        },
        message: `El numero no es valido para la region!`},
        required: [true, 'El numero de telefono es obligatorio']
      },
      email: {
        unique:true,
        lowercase:true,
        type: String,
        equired: [true, 'El correo electronico es obligatorio']
      },
      password: {
        type: String,
        equired: [true, 'La contraseña es obligatorio']

      },
      status: {
        type: Boolean,
        default: true
      },
      imgUrl: {
        type: String
      },
      verified: {
        type: Boolean,
        default: false

      },
      code: {
        type: Number
      },
      dateCreate: { type: Date, default: Date.now },
});

UserClient.methods.toJSON = function() {
  const { __v, password,_id,dateCreate,code, ...client  } = this.toObject();
  return client;
}


export default model<ClientInterface>('Client', UserClient);