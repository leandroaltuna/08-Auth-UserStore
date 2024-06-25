import { CategoryDto } from "../../dtos";
import { CategoryEntity, UserEntity } from "../../entities";
import { CategoryRepository } from "../../repositories";


export interface CreateCategoryUseCase {

    execute( dto: CategoryDto, user: UserEntity ): Promise<CategoryEntity>

}

export class CreateCategory implements CreateCategoryUseCase {
   
    constructor(
        private readonly repository: CategoryRepository,
    ) {}

    execute(dto: CategoryDto, user: UserEntity): Promise<CategoryEntity> {
        return this.repository.createCategory( dto, user );
    }

}