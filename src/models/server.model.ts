import  express, {Application} from "express";
import fileUpload, { UploadedFile  } from "express-fileupload";
import cors from "cors";
import path from 'path';


import clientRoute from '../routes/client.routes';
import bikerRoute from '../routes/biker.routes';
import adminRoute from '../routes/admin.routes';
import categoryRoute from '../routes/category.routes';
import companyRoute from '../routes/company.routes';
import productRoute from '../routes/product.routes'
import ubicationRoute from '../routes/ubication.routes'
import directionBuyerRoute from '../routes/directionBuyer.route'
import cardRoute from '../routes/cardClient.router'



import { dbConection } from "../config/db.config";

export default class Server{
    public app:Application;
    private port:string;
    private apiPath = {
        biker: "/api/biker",
        client: "/api/client",
        admin: "/api/admin",
        category:"/api/category",
        company : "/api/company",
        product : "/api/product",
        ubication: "/api/ubication",
        directionBuyer:"/api/direction-buyer",
        card:"/api/card"
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

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir:'/tmp/',
          }));

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
        this.app.use(this.apiPath.admin, adminRoute);
        this.app.use(this.apiPath.category, categoryRoute);     
        this.app.use(this.apiPath.company, companyRoute);
        this.app.use(this.apiPath.product, productRoute);
        this.app.use(this.apiPath.ubication, ubicationRoute);
        this.app.use(this.apiPath.directionBuyer, directionBuyerRoute)
        this.app.use(this.apiPath.card, cardRoute)

    }
}