import { PaginationDto, ProductDatasource, ProductDto, ProductEntity, ProductRepository } from "../../domain";


export class ProductRepositoryImpl implements ProductRepository {
    
    constructor(
        private readonly datasource: ProductDatasource,
    ) {}

    createProduct(productDto: ProductDto): Promise<ProductEntity> {
        return this.datasource.createProduct( productDto );
    }
    getProducts(paginationDto: PaginationDto): Promise<Object> {
        return this.datasource.getProducts( paginationDto );
    }

}