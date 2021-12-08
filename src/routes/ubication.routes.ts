import { Router } from "express";
import { check } from "express-validator";
import { postNewLocation, putMunicipaly, getAllUbications } from '../controllers/ubication.controller';
import { checkEmailExistAdmin } from '../helpers/verified.helper';


const router = Router();

//Obtener Ubicacion
router.get('/all',[],getAllUbications)

//Guardar nueva ubicacion
router.post('/',[], postNewLocation)

//Agregar Municipio
router.put('/municipio/:idUbicacion',[],putMunicipaly)

export default router;