import { Request, Response } from "express";

import Biker from '../models/biker.model';
import bcryptjs from 'bcryptjs';
import { sendEmailVerified } from "../helpers/mail.helper";
import { generateJWT } from "../helpers/jwt.helper";
import { verified } from './client.controller';
import { uploadImg, updateImage } from '../helpers/cloudinary';


export const  registerBiker = async (req:Request, res:Response)=>{
    const {password, ...bikerData} = req.body;
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    const passwordEncrip = bcryptjs.hashSync( password.toString(), salt );
    const code = Math.ceil(Math.random() * (99999 - 10000) + 10000);
    const biker = new Biker({...bikerData, password: passwordEncrip, code:code});
    sendEmailVerified(biker.firstName, biker.email, code);
    
    try {
        //Guardar el nuevo registro
        await biker.save();

        res.status(200).json({
            msj:true,
            id:biker._id,
            biker
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"Error al registrar motorista",
            error
        })       
    }   
}


export const loginBiker = async(req:Request, res:Response)=>{
    const {email, password } = req.body
    try {
        const biker = await Biker.findOne({email:email.toLowerCase()});
        
        if (!biker) {
            return res.status(400).json({
                ok:false,
                msj:`El correo ${email}, no esta registrado`
            });
        }
        //Verificar si la contraseña coincide
        const validPassword = bcryptjs.compareSync(password, biker.password);
        
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:"La contraseña es incorrecta"
            })
        }
        if(!biker.verified){
            return res.status(400).json({
                ok:false,
                verified: false,
                msj:"La cuenta aun no ha sido verificada"
            })
        }
        
        if( biker.info.imgCard === undefined || biker.info.imgLicense === undefined){
            
            return res.status(400).json({
                ok:false,
                verified: true,
                aproved: null,
                msj:"Falta informacion",
                
            })
        }
        if(!biker.aproved){
            return res.status(400).json({
                ok:false,
                verified: true,
                aproved: false,
                msj:"La cuenta aun no ha sido validada",
            })
        }
        if(!biker.status){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta ha sido eliminada"
            })
        }
        //Obtener token
        const token = await generateJWT(biker._id);
        res.status(200).json({
            ok: true,
            biker,
            token
        }) 
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })  
    }
}
interface MulterRequest extends Request {
    files: any;
}

export const putInfoImg = async(req:Request, res:Response)=>{
    //Subir imagen de la imgCard y  imgLicense a Cloudinary
    const {imgCard, imgLicense} = (req as MulterRequest ).files;
    var imgCardUrl:string;
    var imgLicenseUrl:string;
    try{
        
        //Actualizar el usuario
        const biker = await Biker.findOne({email:req.body.email});
        if(!biker){
            return res.status(400).json({
                ok:false,
                msj:"El usuario no existe"
            })
        }
        if(biker.info.imgCard !== undefined && biker.info.imgLicense !== undefined){
             imgCardUrl = await updateImage(biker.info.imgCard, imgCard, 'user/info');
            imgLicenseUrl = await updateImage(biker.info.imgLicense, imgLicense, 'user/info');
        }else{
         //Subir imagen de la imgCard y  imgLicense a Cloudinary
             imgCardUrl = await uploadImg(imgCard,  'user/info');
            imgLicenseUrl = await uploadImg(imgLicense, 'user/info');
    } 

      
        biker.info.imgCard = imgCardUrl;
        biker.info.imgCard = imgCardUrl;
        biker.info.imgLicense = imgLicenseUrl;
        await biker.save();
        return res.status(200).json({
            ok:true,
            biker
        });
    }catch(error){
        return res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
}
//TODO: Aprobar la cuenta del motorista, con su id
export const aproveBiker = async(req:Request, res:Response)=>{
    const {id} = req.params;
    try {
        const biker = await Biker.findOne({email:id});
        if(!biker){
            return res.status(400).json({
                ok:false,
                msj:"El motorista no existe"
            })
        }
        biker.aproved = true;
        await biker.save();
        return res.status(200).json({
            ok:true,
            msg:"Motorista aprobado"
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
}
export const isAproved = async(req:Request, res:Response)=>{
    const {email} = req.body;

    try {
        //Eviar nombre del motorista 

        const biker = await Biker.findOne({email:email.toLowerCase()});
        if(!biker){
            return res.status(400).json({
                ok:false,
                msj:"El usuario no existe"
            })
        }
        if(biker.aproved){
            return res.status(200).json({
                ok:true,
                biker, 
                msj:"La cuenta ya ha sido validada"
            })
        }
        res.status(400).json({
            ok:false,
            msj:"La cuenta aun no ha sido validada"
        })


    }catch(error){
        return res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
}
export const checkBiker = async(req:Request, res:Response)=>{
    const {email} = req.body;
    const {code} = req.body;
    try {
        var biker = await Biker.findOne({email});
        const id = biker?._id;
        if(biker?.verified){
            return res.status(400).json({
                ok:false,
                msj:"La cuenta ya ha sido verificada"
            })
        }
        if(biker?.code === code){
            biker =  await Biker.findByIdAndUpdate(id, {verified: true} );
            return res.status(200).json({
                ok:true,
                msj:"Correo electronico verificado"
            })
        }
        res.status(400).json({
            ok:false,
            msj:"El codigo no es valido"
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        }) 
    }
}

export const getAllBiker = async(req:Request, res:Response)=>{
    const {limit= 5,offset = 0, aproved=1} = req.query;
    let aprovedStatus = true;
    if (aproved === '0') {
        aprovedStatus = false;
    }
    
    const query = {state: true, aproved:aprovedStatus};
    const bikers = await 
        Biker.find({state: true, aproved:aprovedStatus})
                .skip(Number(offset))
                .limit(Number(limit))
        
    const count = await Biker.countDocuments(query);
    try{
        res.status(200).json({
            ok:true,
            count: Math.round(count/Number(limit)),
            bikers
        })
    }

    catch (error){
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        }) 
    }
    
}

export const getBiker = async(req:Request, res:Response)=>{
    const {uid} = req.body;
    try {
        const biker = await Biker.findById(uid, {
            info:0, status:0, aproved:0, verified:0
        });
    if(!biker){
        return res.status(400).json({
            ok:false,
            msj:"El motorista no existe"
        })
    }
    res.status(200).json({
        ok:true,
        biker,
        token: req.body.token
    })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:"server error",
            error
        })
    }
    
}