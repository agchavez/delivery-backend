import { Router } from "express";
import { check } from "express-validator";
import { getAllDirecion, postNewDirectionBuyer } from '../controllers/directionBuyer.controller'
import { checkEmailExistAdmin } from '../helpers/verified.helper';


const router = Router();

//Obtener Ubicacion
router.get('/all',[],getAllDirecion)

//Guardar nueva ubicacion
router.post('/',[], postNewDirectionBuyer)


export default router;