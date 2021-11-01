import { Router } from "express";
import { check } from "express-validator";
import { verifyTokenClient, validator, verifyTokenAdmmin } from '../middlewares/validator';
import { getAllAdmin, registerAdmin } from '../controllers/admin.controller';


const router = Router();

//TODO: Login de usuarios adminstradores por correo y contraseña
router.get('/login', [
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    validator
], ()=>{});

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
    validator
],
registerAdmin
)





export default router;