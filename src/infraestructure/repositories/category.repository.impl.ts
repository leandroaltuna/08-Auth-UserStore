import { CategoryDto, UserEntity, PaginationDto, CategoryRepository, CategoryDatasource, CategoryEntity } from "../../domain";


export class CategoryRepositoryImpl implements CategoryRepository {
    
    constructor(
        private readonly datasource: CategoryDatasource,
    ) {}

    createCategory(categoryDto: CategoryDto, user: UserEntity): Promise<CategoryEntity> {
        return this.datasource.createCategory( categoryDto, user );
    }

    getCategories(paginationDto: PaginationDto): Promise<Object> {
        return this.datasource.getCategories( paginationDto );
    }

}