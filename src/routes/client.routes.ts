import { Router,Response, Request} from 'express';
import { check } from 'express-validator';
import { validator, verifyTokenClient } from '../middlewares/validator';
import { loginClient, registerClient, checkClient, getAllClient, getClientById, postRestoreByEmail, putRestoreNewPassword, getRestoreCheckCode, verified } from '../controllers/client.controller';
import { checkEmailExist, checkClientById, checkEmailNotExistByker } from '../helpers/verified.helper';

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

router.get('/all',[
    
], getAllClient)

router.post('/restore',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('email').custom(checkEmailNotExistByker),
    validator
], postRestoreByEmail);

router.put('/restore/:id',[
    check('id', "El id es obligatorio").isMongoId(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('id').custom(checkClientById),
    validator
], putRestoreNewPassword);

router.get('/check/restore/:id',[
    check('id', "El id es obligatorio").isMongoId(),
    check('code', 'El codigo es obligatorio').notEmpty(),
    check('id').custom(checkClientById),
    validator,
], getRestoreCheckCode);

//TODO: Eliminar usuario cliente
router.delete('/delete/:id',[],()=>{})

//TODO: Actualizar usuario cliente
router.put('/update/:id',[],()=>{})

router.get('/by/:id',[
    check('id', "El id es obligatorio").isMongoId(),
    check('id').custom(checkClientById),
    validator,
], getClientById);


router.get('/validate',[verifyTokenClient], verified);

export default router;