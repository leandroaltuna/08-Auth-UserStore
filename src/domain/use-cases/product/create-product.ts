import { ProductDto } from "../../dtos";
import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";


export interface CreateProductUseCase {

    execute( dto: ProductDto ): Promise<ProductEntity>;

}

export class CreateProduct implements CreateProductUseCase {
    
    constructor(
        private readonly repository: ProductRepository,
    ) {}

    execute(dto: ProductDto): Promise<ProductEntity> {
        return this.repository.createProduct( dto );
    }

}