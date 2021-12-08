import { Router } from "express";
import { getListOrders, postAddOrder, putOrderStatus,getOrderClient } from '../controllers/order.controller';
import { check } from 'express-validator';
import { validator } from '../middlewares/validator';
import { verifyTokenClient } from '../middlewares/validatorJWT';

const router = Router();

//Listar los pedidos 
router.get("/", [], getListOrders)

//Agregar un pedido segun el id del producto

router.post("/", [
    check('orderDetails').isArray( { min: 2, max: 10 } ),
    check('orderDetails.*.product', 'El id del producto no es valido').isMongoId(),
    check('orderDetails.*.quantity', 'La cantidad es requerida').isInt({ min: 1 }),
    validator,
    verifyTokenClient,
], postAddOrder);

//Eliminar un pedido segun el id del pedido
router.delete("/:id", [], );
//Actualizar estado del pedido 
router.put("/:id", [
    check('id', 'El id no es valido').isMongoId(),
    check('status').isIn(['pending', 'delivered', 'cancelled']),
    validator,
], putOrderStatus);


//Obtener pedidos de un cliente
router.get("/buyer/:idBuyer",[],getOrderClient)


export default router;