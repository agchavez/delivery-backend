import { Router } from "express";
import { check } from "express-validator";
import { getAllBiker } from "../controllers/biker.controller";
import { getAllCategory, getCompanyById, postNewCategory } from '../controllers/category.controller';
import { checkEmailExistAdmin } from '../helpers/verified.helper';


const router = Router();

//Obtener todo los usuarios administradores
//  router.get('/all', [
//      //verifyTokenAdmmin
//  ], getAllCategory)


//obtener categorias
router.get('/all',[], getAllCategory);

//Guardar nueva categoria
router.post('/',[], postNewCategory)



//obtener empresas de categoria
router.get('/by/:idCategory',[],getCompanyById)

export default router;