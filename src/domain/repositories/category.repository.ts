import { CategoryDto, PaginationDto } from "../dtos";
import { CategoryEntity, UserEntity } from "../entities";


export abstract class CategoryRepository {

    abstract createCategory( categoryDto: CategoryDto, user: UserEntity ): Promise<CategoryEntity>

    abstract getCategories( paginationDto: PaginationDto ): Promise<Object> 

}