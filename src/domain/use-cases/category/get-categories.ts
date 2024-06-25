import { PaginationDto } from "../../dtos";
import { CategoryRepository } from "../../repositories";


export interface GetCategoriesUseCase {

    execute( dto: PaginationDto ): Promise<Object>;

}


export class GetCategories implements GetCategoriesUseCase {
    
    constructor(
        private readonly repository: CategoryRepository,
    ) {}


    execute( dto: PaginationDto ): Promise<Object> {
        return this.repository.getCategories( dto );
    }

}