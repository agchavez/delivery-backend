import { Router,Response, Request} from 'express';
import { check } from 'express-validator';
import { validator } from '../middlewares/validator';
import { loginClient, registerClient, checkClient, getAllClient, getClientById, postRestoreByEmail, putRestoreNewPassword, getRestoreCheckCode, verified, postComment } from '../controllers/client.controller';
import { checkEmailExist, checkClientById, checkEmailNotExistByker, checkNotEmailExistClient } from '../helpers/verified.helper';
import { postNewCompany, getCompany, getAllCompany,getCompanyName } from '../controllers/company.controller';
import { verifyTokenAdmmin } from '../middlewares/validatorJWT';

const router = Router();

router.get('/all',[
    //verifyTokenAdmmin
], getAllCompany)

//Agregar una nueva compañia a una categoria
//router.put('/:idCategory',[], putNewComapany)

//agregar Empresa
router.post('/', postNewCompany)

//obtener empresa por id
router.get('/:idCompany',getCompany)

//obtener nombre de una empresa
router.get("/name/:idCompany",getCompanyName)

export default router;