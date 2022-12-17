import mongoose from 'mongoose';

export const dbConection =async()=>{
    try {
        
        const dbLink: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
        await mongoose.connect( dbLink);
        
        
    } catch (error) {
        console.log(error);
        console.log("Error al connectar con la base de datos...")
    }

}