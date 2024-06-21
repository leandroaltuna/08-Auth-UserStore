import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routers';
import { ProductRoutes } from './product/routers';
import { FileUploadRoutes } from './file-upload/routers';
import { ImageRoutes } from './images/routers';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use( '/api/auth', AuthRoutes.routes);
    router.use( '/api/categories', CategoryRoutes.routes);
    router.use( '/api/products', ProductRoutes.routes );
    router.use( '/api/upload', FileUploadRoutes.routes );
    router.use( '/api/images', ImageRoutes.routes );



    return router;
  }


}

