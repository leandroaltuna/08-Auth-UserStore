import { PaginationDto, ProductDto } from "../dtos";
import { ProductEntity } from "../entities";


export abstract class ProductDatasource {

    abstract createProduct( productDto: ProductDto ): Promise<ProductEntity>;

    abstract getProducts( paginationDto: PaginationDto ): Promise<Object>;
    
}