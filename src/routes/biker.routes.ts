import { Router } from "express";
import { check } from "express-validator";

import { validator } from '../middlewares/validator';
import { checkBikerById, checkEmailExistByker, checkEmailNotExistByker } from '../helpers/verified.helper';

import { registerBiker, checkBiker, loginBiker, getAllBiker, putInfoImg, getBiker, isAproved, aproveBiker } from '../controllers/biker.controller';
import { verifyImage } from '../middlewares/validatorImg';
import { verifyTokenBiker } from '../middlewares/validatorJWT';


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


//TODO: Obtener unuario motorista por id
router.get('/by/:id', [], ()=>{});

//TODO: Obtener todo los usuarios motorista

router.get('/all',[], getAllBiker);
//TODO: Eliminar usuario motorista
router.delete('/delete/:id',[],()=>{})

//TODO: Actualizar usuario motorista
router.put('/update/:id',[],()=>{})

//TODO: Validar cuenta de motorista por el di 
router.put('/aproved/:id',[
    check('id', 'El id es requerido').isMongoId(),
    check('id').custom(checkBikerById),
    validator
],aproveBiker)

//TODO: Comporobar si la cuenta esta aprobada
router.post('/isAproved',[
    check('email', "El correo es obligatorio").isEmail(),
    
    validator,
],isAproved)

router.get('/validate',[
    verifyTokenBiker
], getBiker);
export default router;