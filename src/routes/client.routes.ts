import { Router,Response, Request} from 'express';
import { check } from 'express-validator';
import validator from '../middlewares/validator';
import { loginClient, registerClient, checkClient } from '../controllers/client.controller';
import { checkEmailExist, checkClientById } from '../helpers/verified.helper';

const router = Router();

router.get('/login',[
    check('email', 'El correo electronico es requirido').isEmail(),
    check('password', 'La contraseña es requirida').notEmpty(),
    validator
], loginClient);

router.post('/register',[
    check('email', 'El correo electronico es requirido').isEmail(),
    check('password', 'La contraseña es requirida').notEmpty(),
    check('firstName', 'El primer nombre es requirida').notEmpty(),
    check('lastName', 'El segundo nombre es requirida').notEmpty(),
    check('phone', 'El numero de telefono es requirida').notEmpty(),
    check('email').custom(checkEmailExist),
    validator,
    
], registerClient);

router.put('/check/:id',[
    check('id', "El id es obligatorio").isMongoId(),
    check('code', 'El codigo es obligatorio').notEmpty(),
    check('id').custom(checkClientById),
    validator,
], checkClient)

export default router;