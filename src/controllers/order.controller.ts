import { Request, Response } from "express";
;
import Company  from '../models/company.model';

import { Order, TakeOrder  } from "../models/order.model";
import Direction from "../models/directionBuyer.model";
import { ObjectId } from 'bson';

//Listar las ordenes segun el estado de la orden
export const getListOrders = async (req: Request, res: Response) => {
    const status = req.query.status;
    const {limit = 10, offset = 0} = req.query;
    try {
        //Obtener el logo de la empresa segun el producto
        const orders = await Order.find({status})
                                .limit(Number(limit))
                                .skip(Number(offset))
                                .populate('user', 'firstName lastName')
                                .populate({
                                    path: 'orderDetails.product',
                                    populate: {
                                        path: 'company',
                                        model: 'Company',
                                        select: 'name imgUrl location'
                                    },
                                    select: 'name compnay',
                                    model: 'Product'
                                })
      
        // orders.map(async (order:any, i:number) => {
        //     await order.orderDetails.map(async (orderDetail:any, j:number)=>{
        //         orderDetail.company = await Company.findById(orderDetail.product.company);
        //     }
           
        //     )
        //     console.log(order.orderDetails);
            
            
        // })
        
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: 'Error al listar las ordenes',
            error
        });
    }
}

//Obtener orden por id
export const getOrderById = async (req: Request, res: Response) => {
    const id = req.params.idOrder;
    try{
        const order:any = await Order.findById(id)
                                .populate('user', 'firstName lastName')
                                .populate({
                                    path: 'orderDetails.product',
                                    populate: {
                                        path: 'company',
                                        model: 'Company',
                                        select: 'name imgUrl location'
                                    },
                                    select: 'name compnay',
                                    model: 'Product'
                                })
        if (!order) {
          return res.status(400).json({
            message: 'No se encontro la orden',

          })
        }
        console.log(order.user);
        
        const direction = await Direction.findOne({idBuyer: order.user._id})
        return res.status(200).json({order,direction });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error al obtener la orden',
            err
        });
    }
}



//listar ordenes de un cliente
export const getOrderClient =async(req:Request,res:Response)=>{

     const orders = await  Order.aggregate([

        {
            $lookup: {
                from: "products",
                localField: "orderDetails.product",
                foreignField: "_id",
                as: "prod"
            },

        },
        {
            $match: {
                user: new ObjectId(req.params.idBuyer),
            }
        },
        {
            $project:{
                _id:true,
                status:true,
                "prod.company":true
            }
        }
    ])
    try{
            res.status(200).json({
                ok:true,
                orders
               
            }) 
        }
            catch (error){
                res.status(500).json({
                    ok:false,
                    msj:"server error",
                    error
                }) 

            }
}



//Agregar una orden segun el id del producto y el id del usuario
export const postAddOrder = async (req: Request, res: Response) => {
    const {uid, orderDetails } = req.body;
    try{
        const order = new Order({
            user: uid,
            orderDetails,

        });
        const newOrder = await order.save();
        res.status(200).json(newOrder);
    }catch(error){
        res.status(500).json({
            message: 'Error al agregar la orden',
            error
        });
    }

}

export const putOrderStatus = async (req: Request, res: Response) => {
    const {  idOrder} = req.params;
    const {uid,status} = req.body;
    try {
        
        if (status === 'accepted') {
            const takeOrder = new TakeOrder({
                order : idOrder,
                biker : uid
            })
            await takeOrder.save();
        }
        const order = await Order.findByIdAndUpdate(idOrder, {status}, {new: true});
        res.status(200).json({
            ok:true,
            order
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el estado de la orden',
            error
        });
    }
}