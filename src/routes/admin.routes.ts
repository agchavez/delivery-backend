import { Router } from "express";
import { check } from "express-validator";
import { validator } from '../middlewares/validator';
import { getAllAdmin, registerAdmin, loginAdmin } from '../controllers/admin.controller';
import { checkEmailExistAdmin } from '../helpers/verified.helper';
import { verifyTokenAdmmin } from '../middlewares/validatorJWT';


const router = Router();

//TODO: Login de usuarios adminstradores por correo y contraseña
router.get('/login', [
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    validator
], loginAdmin);

//Obtener todo los usuarios administradores
router.get('/all', [
    verifyTokenAdmmin
], getAllAdmin);

//TODO: Obtener unuario administrador por id
router.get('/by/:id', [], ()=>{});

//TODO: Eliminar usuario administrador
router.delete('/delete/:id',[
    check('id','El id es requerido').isMongoId(),
    verifyTokenAdmmin
],()=>{})

//TODO: Actualizar usuario administrador
router.put('/update/:id',[],()=>{})

//TODO: Registrar usuario administrador
router.post('/register', [
    check('email', 'El correo es requerido').isEmail(),
    check('firstName', 'El primer nombre es requerido').notEmpty(),
    check('lastName', 'El segundo nombre es requerido').notEmpty(),
    check('email', 'La contraseña es requerido').notEmpty(),
    check('phone', 'El telefono es requerido').notEmpty(),
    check('email').custom(checkEmailExistAdmin),
    validator
],
registerAdmin
)





export default router;