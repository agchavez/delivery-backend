import { Request, Response, Router } from "express";
import { check } from "express-validator";

import validator from "../middlewares/validator";
import { checkBikerById, checkEmailExistByker } from "../helpers/verified.helper";

import { registerBiker, checkBiker, loginBiker } from '../controllers/biker.controller';

const router =  Router();
router.post('/register',[
    check('email', 'El correo electronico es requirido').isEmail(),
    check('password', 'La contraseña es requirida').notEmpty(),
    check('identity', 'La contraseña es requirida').notEmpty(),
    check('firstName', 'El primer nombre es requirida').notEmpty(),
    check('lastName', 'El segundo nombre es requirida').notEmpty(),
    check('phone', 'El numero de telefono es requirida').notEmpty(),
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
], checkBiker)

export default router;