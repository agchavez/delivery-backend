import { Router } from "express";
import { getListOrders, postAddOrder, putOrderStatus, getOrderClient, getOrderById } from '../controllers/order.controller';
import { check } from 'express-validator';
import { validator } from '../middlewares/validator';
import { verifyTokenClient, verifyTokenBiker } from '../middlewares/validatorJWT';

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
router.delete("/:idOrder", [], );
//Actualizar estado del pedido 
router.put("/:idOrder", [
    check('idOrder', 'El id no es valido').isMongoId(),
    check('status').isIn(['pending','accepted','onway','origin','destiny', 'cancelled']),
    verifyTokenBiker,
    validator,
    
], putOrderStatus);

router.get( "/:idOrder", [], getOrderById)


//Obtener pedidos de un cliente
router.get("/buyer/:idBuyer",[],getOrderClient)


export default router;