import { Router } from "express";
import { check } from "express-validator";
import { verifyTokenClient, validator, verifyTokenAdmmin } from '../middlewares/validator';


const router = Router();

//TODO: Login de usuarios adminstradores por correo y contraseña
router.get('/login', [
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    validator
], ()=>{});

//TODO: Obtener todo los usuarios administradores
router.get('/all', [
    verifyTokenAdmmin
], ()=>{});

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
    validator
],
()=>{}
)





export default router;