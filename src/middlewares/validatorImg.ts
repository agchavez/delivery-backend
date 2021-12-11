import { Request, Response } from "express";

//Validar si existe imagenes en la peticio 
export const verifyImages = (req:Request, res:Response, next:Function)=>{
    try {
        
        const images = (req as any).files;
        if(!images){
            return res.status(400).json({
                ok:false,
                msg:"No hay imagenes en la peticion"
            });
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            msg:"Error en la validacion de imagenes",
            error
        });
    }
        
    }


//Validar si la imagen es valida 
export const verifyImage = async (req:Request, res:Response, next:Function)=>{
    try {
        const {imgCard, imgLicense} = (req as any).files;
    if (!imgCard || !imgLicense) {
        return res.status(400).json({
            ok:false,
            msg:"No hay imagen en la peticion"
        }); 
    }
    next();
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:"Error al subir la imagen",
            error
        });
    }
        
    
}
