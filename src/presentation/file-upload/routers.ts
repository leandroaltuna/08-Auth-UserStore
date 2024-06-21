import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services";
import { FileUploadMiddleware, TypeUploadMiddleware } from "../middlewares";


export class FileUploadRoutes {


    static get routes() : Router{

        const router = Router();
        const fileUploadService = new FileUploadService()
        const fileuploadController = new FileUploadController( fileUploadService );

        // The Middleware will be use in both endpoints: single and multiple
        router.use([ FileUploadMiddleware.containFiles, TypeUploadMiddleware.validTypes([ 'users', 'categories', 'products' ]) ]);

        router.post( '/single/:type', fileuploadController.uploadFile );
        router.post( '/multiple/:type', fileuploadController.uploadMultipleFiles );

        return router;
    }


}