import { Router } from "express";
import { check } from "express-validator";
import { getAllBiker } from "../controllers/biker.controller";
import { getAllCategory } from '../controllers/category.controller';
import { checkEmailExistAdmin } from '../helpers/verified.helper';


const router = Router();

//Obtener todo los usuarios administradores
//  router.get('/all', [
//      //verifyTokenAdmmin
//  ], getAllCategory)

router.get('/all',[], getAllCategory);


export default router;