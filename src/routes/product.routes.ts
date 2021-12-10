import { Router,Response, Request} from 'express';
import { check } from 'express-validator';

import { validator} from '../middlewares/validator';
import { verifyImages } from '../middlewares/validatorImg';
import { verifyTokenAdmmin } from '../middlewares/validatorJWT';

import { checkEmailExist, checkClientById, checkEmailNotExistByker, checkNotEmailExistClient, checkProductExist } from '../helpers/verified.helper';
import { postNewProduct, getCompanyByCat, getProductByCompany, getProductByCat, getAllProducts, deleteProduct } from '../controllers/product.controller';
const router = Router();

// router.get('/all',[
//     verifyTokenAdmmin
// ], getAllClient)
//Obtener todos los productos con paginacion
router.get('/all',[
    verifyTokenAdmmin
], getAllProducts)
//Guardar nuevo producto
router.post('/:company/:category', postNewProduct)
//Eliminar producto
router.delete('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(checkProductExist),
    validator,
    //verifyTokenAdmmin
], deleteProduct)

//obtener empresa de categoria
router.get('/by/:idCat', [
    check('idCat', 'El id de la categoria no es valido').isMongoId(),
    validator
],getCompanyByCat)

//Agregar producto 
router.post('/', [
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('description', 'La descripcion del producto es obligatoria').not().isEmpty(),
    check('price', 'El precio del producto es obligatorio').not().isEmpty(),
    check('company', 'El id de la empresa es obligatorio').isMongoId(),
    check('category', 'El id de la categoria es obligatorio').isMongoId(),
    validator,
    verifyImages,
   // verifyTokenAdmmin,
], postNewProduct)

//obtener productos de empresa
router.get('/bycompany/:idCompany', [
    check('idCompany', 'El id de la compañia no es valido').isMongoId(),
    validator
],getProductByCompany)

//obtener productos por empresa y categoria
router.get('/bycategory/:idCompany/company/:idCate', [
    check('idCompany', 'El id de la categoria no es valido').isMongoId(),
    check('idCate', 'El id de la categoria no es valido').isMongoId(),
    validator,
    
],getProductByCat)
export default router;