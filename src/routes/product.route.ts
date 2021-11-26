import { Router,Response, Request} from 'express';
import { check } from 'express-validator';
import { validator, verifyTokenClient, verifyTokenAdmmin } from '../middlewares/validator';
import {postNewProduct,getCompanyByCat,getProductByCompany } from '../controllers/product.controller';
import { checkEmailExist, checkClientById, checkEmailNotExistByker, checkNotEmailExistClient } from '../helpers/verified.helper';
const router = Router();

// router.get('/all',[
//     verifyTokenAdmmin
// ], getAllClient)

//Guardar nuevo producto
router.post('/:company/:category', postNewProduct)


//obtener empresa de categoria
router.get('/by/:idCat',getCompanyByCat)


//obtener productos de empresa
router.get('/:idCompany',getProductByCompany)
export default router;