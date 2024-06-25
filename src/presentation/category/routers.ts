import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryDatasourceImpl, CategoryRepositoryImpl } from '../../infraestructure';
// import { CategoryService } from '../services/category.service';


export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();
    // const categoryService = new CategoryService;
    // const categoryController = new CategoryController( categoryService );

    const categoryDatasource = new CategoryDatasourceImpl();
    const categoryRespository = new CategoryRepositoryImpl( categoryDatasource );
    const categoryController = new CategoryController( categoryRespository );
    
    // Definir las rutas
    router.get('/', categoryController.getCategories );
    router.post('/', [ AuthMiddleware.validateJWT ], categoryController.createCategory );

    return router;
    
  }

}