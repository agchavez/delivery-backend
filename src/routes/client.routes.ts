import { Router,Response, Request} from 'express';
import { check } from 'express-validator';
import validator from '../middlewares/validator';
import { loginClient } from '../controllers/client.controller';

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
    validator
], loginClient);

export default router;