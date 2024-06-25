import { PaginationDto } from "../../dtos";
import { ProductRepository } from "../../repositories";


export interface GetProductsUseCase {

    execute( paginationDto: PaginationDto ): Promise<Object>;

}

export class GetProducts implements GetProductsUseCase {
    
    constructor(
        private readonly repository: ProductRepository,
    ) {}

    execute(paginationDto: PaginationDto): Promise<Object> {
        return this.repository.getProducts( paginationDto );
    }

}