import { Router,Response, Request} from 'express';
import { check } from 'express-validator';
import { validator } from '../middlewares/validator';
import { loginClient, registerClient, checkClient, getAllClient, getClientById, postRestoreByEmail, putRestoreNewPassword, getRestoreCheckCode, verified, postComment } from '../controllers/client.controller';
import { checkEmailExist, checkClientById, checkEmailNotExistByker, checkNotEmailExistClient } from '../helpers/verified.helper';
import { verifyTokenAdmmin, verifyTokenClient } from '../middlewares/validatorJWT';

const router = Router();

router.post('/login',[
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

router.put('/check/code',[
    check('email', "El correo es obligatorio").isEmail(),
    check('code', 'El codigo es obligatorio').notEmpty(),
    check('email').custom(checkNotEmailExistClient),
    validator,
], checkClient)

router.get('/:id',getClientById)
router.get('/all',[
    verifyTokenAdmmin
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
router.delete('/delete/:id',[
    verifyTokenAdmmin
],()=>{})

//TODO: Actualizar usuario cliente
router.put('/update/:id',[
    verifyTokenClient
],()=>{})

router.get('/by/:id',[
    check('id', "El id es obligatorio").isMongoId(),
    check('id').custom(checkClientById),
    validator,
], getClientById);

router.post('/comment', [
    check('firstName', 'El primer nombre es requerido').notEmpty(),
    check('lastName', 'El segundo nombre es requerido').notEmpty(),
    check('email', 'El correo es requerido').isEmail(),
    check('msj', 'El comentario es requerido').notEmpty(),
    validator
], postComment)


router.get('/validate',[verifyTokenClient], verified);

export default router;