import { Request, Response, Router } from "express";
import { check } from "express-validator";

import { validator, verifyTokenBiker } from '../middlewares/validator';
import { checkBikerById, checkEmailExistByker } from "../helpers/verified.helper";

import { registerBiker, checkBiker, loginBiker, getAllBiker } from '../controllers/biker.controller';
import { getAllCategory } from "../controllers/category.controller";


const router =  Router();
router.post('/register',[
    check('email', 'El correo electronico es requerido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    check('identity', 'La identidad es requerida').notEmpty(),
    check('firstName', 'El primer nombre es requerido').notEmpty(),
    check('lastName', 'El segundo nombre es requerido').notEmpty(),
    check('phone', 'El numero de telefono es requerioa').notEmpty(),
    check('email').custom(checkEmailExistByker),
    validator,
],registerBiker);

router.get('/login',[
    check('email', 'El correo electronico es requirido').isEmail(),
    check('password', 'La contraseña es requirida').notEmpty(),
    validator
], loginBiker);

router.put('/check/:id',[
    check('id', "El id es obligatorio").isMongoId(),
    check('code', 'El codigo es obligatorio').notEmpty(),
    check('id').custom(checkBikerById),
    validator,
], checkBiker);

//TODO: Obtener todo los usuarios motorista

//TODO: Obtener unuario motorista por id
router.get('/by/:id', [], ()=>{});
router.get('/all',[], getAllBiker);
//TODO: Eliminar usuario motorista
router.delete('/delete/:id',[],()=>{})

//TODO: Actualizar usuario motorista
router.put('/update/:id',[],()=>{})


router.get('/validate',verifyTokenBiker);
export default router;