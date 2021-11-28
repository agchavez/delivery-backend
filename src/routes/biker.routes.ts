import { Request, Response, Router } from "express";
import { check } from "express-validator";

import { validator, verifyTokenClient, verifyTokenBiker, verifyImage } from '../middlewares/validator';
import { checkBikerById, checkEmailExistByker, checkEmailNotExistByker } from '../helpers/verified.helper';

import { registerBiker, checkBiker, loginBiker, getAllBiker, putInfoImg, getBiker } from '../controllers/biker.controller';


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

router.post('/login',[
    check('email', 'El correo electronico es requirido').isEmail(),
    check('password', 'La contraseña es requirida').notEmpty(),
    validator
], loginBiker);

router.put('/check',[
    check('email', "El correo es obligatorio").isEmail(),
    check('code', 'El codigo es obligatorio').notEmpty(),
    check('email').custom(checkEmailNotExistByker),
    validator,
], checkBiker);

router.put('/info',[
    check('email', "El correo es obligatorio").isEmail(),
    verifyImage,
    check('email').custom(checkEmailNotExistByker),
    validator
], putInfoImg)

//TODO: Obtener todo los usuarios motorista
router.get('/all', [], ()=>{});

//TODO: Obtener unuario motorista por id
router.get('/by/:id', [], ()=>{});

router.get('/all',[], getAllBiker);

//TODO: Eliminar usuario motorista
router.delete('/delete/:id',[],()=>{})

//TODO: Actualizar usuario motorista
router.put('/update/:id',[],()=>{})


router.get('/validate',[verifyTokenBiker], getBiker);
export default router;