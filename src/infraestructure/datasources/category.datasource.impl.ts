import { CategoryModel } from "../../data";
import { CategoryDto, UserEntity, PaginationDto, CustomError, CategoryDatasource, CategoryEntity } from "../../domain";


export class CategoryDatasourceImpl implements CategoryDatasource {
    
    async createCategory(categoryDto: CategoryDto, user: UserEntity): Promise<CategoryEntity> {
       
        const categoryExists = await CategoryModel.findOne({ name: categoryDto.name });
        if ( categoryExists ) throw CustomError.badRequest( 'Category already exists' );

        try {

            const category = new CategoryModel({
                ...categoryDto,
                user: user.id,
            });

            await category.save();

            // return {
            //     id: category.id,
            //     name: category.name,
            //     available: category.available,
            // } 

            return CategoryEntity.fromObject( category );

        } catch (error) {
            console.log( error );
            throw CustomError.internalServer(`${ error }`);
        }

    }

    async getCategories(paginationDto: PaginationDto): Promise<Object> {
        
        const { page, limit } = paginationDto;

        try {

            // const total = await CategoryModel.countDocuments();
            // const categories = await CategoryModel.find()
            //     .skip( ( page - 1 ) * limit )
            //     .limit( limit );

            const [ total, categories ] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip( ( page - 1 ) * limit )
                    .limit( limit ),
            ]);

            const resultJson = [{
                page: page,
                limit: limit,
                total: total,
                next: `/api/categories?page=${ ( page + 1 ) }&limit=${ limit }`,
                prev: ( page - 1 > 0 ) ? `/api/categories?page=${ ( page - 1 ) }&limit=${ limit }` : null ,
                categories:  categories.map( category => ({
                    id: category.id,
                    name: category.name,
                    available: category.available,
                })),
            }]

            // return {
            //     page: page,
            //     limit: limit,
            //     total: total,
            //     next: `/api/categories?page=${ ( page + 1 ) }&limit=${ limit }`,
            //     prev: ( page - 1 > 0 ) ? `/api/categories?page=${ ( page - 1 ) }&limit=${ limit }` : null ,
            //     categories:  categories.map( category => ({
            //         id: category.id,
            //         name: category.name,
            //         available: category.available,
            //     })),
            // }

            return resultJson;
            
        } catch (error) {
            throw CustomError.internalServer( 'Internal Server Error' );
        }

    }

}