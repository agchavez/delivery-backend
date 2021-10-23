import { Router } from "express";
import { verifyTokenClient } from '../middlewares/validator';


const router = Router();

//TODO: Login de usuarios adminstradores por correo y contraseña
router.get('/login', [], ()=>{});

//TODO: Obtener todo los usuarios administradores
router.get('/all', [], ()=>{});

//TODO: Obtener unuario administrador por id
router.get('/by/:id', [], ()=>{});

//TODO: Eliminar usuario administrador
router.delete('/delete/:id',[],()=>{})

//TODO: Actualizar usuario administrador
router.put('/update/:id',[],()=>{})





export default router;