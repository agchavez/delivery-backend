//Modelo de ordenes 

import {Schema, model } from 'mongoose'

const OrderSchema = new Schema({

    status:{
        type: String,
        enum: ['pending', 'accepted','onway','origin','destiny', 'cancelled'],
        default:'pending'
    },
    date:{
        type: Date,
        default:Date.now
    },
    
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required:[true,'Id requerido']
    },
    paid: {
        type: Boolean,
        default: false
    },
    orderDetails:{
        type:[
            {
                product:{
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required:[true,'Id requerido']
                },
                quantity:{
                    type: Number,
                    required:[true,'Cantidad requerida']
                },
                totalLine:{
                    type: Number,
                    required:[true,'Total requerido']
    
                },
                complements:[
                    {
                        name:{
                            type: String,
                            required:[true,'Nombre requerido']
                        },
                        quantity:{
                            type: Number,
                            required:[true,'Cantidad requerida']
                        },
                        totalLine:{
                            type: Number,
                            required:[true,'Total requerido']
                        }
                    }
                ]
            }],
        required:[true,'Detalles del pedido requeridos']}

})

const TakeOrderSchema = new Schema({
    order:{
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required:[true,'Id de la orden requerido']
    },
    dateTakem:{
        type: Date,
        default:Date.now
    },
    biker:{
        type: Schema.Types.ObjectId,
        ref: 'Biker',
        required:[true,'Id del motorista requerido']
    }

})


export const Order = model('Order', OrderSchema)
export const TakeOrder = model('TakeOrder', TakeOrderSchema)