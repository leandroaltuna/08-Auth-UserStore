import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { ProductDatasourceImpl, ProductRepositoryImpl } from "../../infraestructure";
// import { ProductService } from "../services";


export class ProductRoutes {

    static get routes(): Router {

        const router = Router();
        // const productService = new ProductService();
        // const productController = new ProductController( productService );

        const productDatasource = new ProductDatasourceImpl();
        const productRepository = new ProductRepositoryImpl( productDatasource )
        const productController = new ProductController( productRepository );
        
        router.get( '/', productController.getProducts );
        router.post( '/', [ AuthMiddleware.validateJWT ], productController.createProduct );
        
        return router;
    }

}