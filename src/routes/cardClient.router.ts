import { Router } from "express";
import { check } from "express-validator";
import { deleteCard, getAllCards,postNewCard } from "../controllers/cardBuyer.controller"
import { checkEmailExistAdmin } from '../helpers/verified.helper';


const router = Router();

//Obtener todo los usuarios administradores
//  router.get('/all', [
//      //verifyTokenAdmmin
//  ], getAllCategory)


//obtener cards
router.get('/all/:idBuyer',[], getAllCards);

//Guardar nueva card
router.post('/',[], postNewCard)

//Eliminar una card
router.delete("/delete/:idCard",deleteCard)

export default router;