import { Router } from "express";
import { check } from "express-validator";
import { getAllCards,postNewCard } from "../controllers/cardBuyer.controller"
import { checkEmailExistAdmin } from '../helpers/verified.helper';


const router = Router();

//Obtener todo los usuarios administradores
//  router.get('/all', [
//      //verifyTokenAdmmin
//  ], getAllCategory)


//obtener categorias
router.get('/all/:idBuyer',[], getAllCards);

//Guardar nueva categoria
router.post('/',[], postNewCard)


export default router;