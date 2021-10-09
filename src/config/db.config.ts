import mongoose from 'mongoose';

export const dbConection =async()=>{
    try {
        
        const dbLink: string = process.env.DB_CNN!;
        await mongoose.connect( dbLink);
        
        
    } catch (error) {
        console.log("Error al connectar con la base de datos...")
    }

}