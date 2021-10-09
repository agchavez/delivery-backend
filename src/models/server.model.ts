import  express, {Application} from "express";
import cors from "cors";

import path from 'path';
import clientRoute from '../routes/client.routes';
import bikerRoute from '../routes/biker.routes';
import { dbConection } from "../config/db.config";

export default class Server{
    public app:Application;
    private port:string;
    private apiPath = {
        biker: "/api/biker",
        client: "/api/client",
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8080"
        

        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    async dbConnection(){
        
        //Conexion con la base de datos
        await dbConection();
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        //Rutas publicas
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto '+ this.port);
            
        })
    }

    routes(){
        //Configuracion de rutas
        this.app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, '../public/index.html'));
          });
        this.app.use(this.apiPath.client, clientRoute);
        this.app.use(this.apiPath.biker, bikerRoute);
        
        
    }
}