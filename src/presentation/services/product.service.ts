import { ProductModel } from "../../data";
import { CustomError, PaginationDto, ProductDto } from "../../domain";



export class ProductService {


    async createProduct( productDto: ProductDto ) {

        const productExists = await ProductModel.findOne({ name: productDto.name });
        if ( productExists ) throw CustomError.badRequest( 'Product already exists' );

        try {
            
            const product = new ProductModel( productDto );

            await product.save();
            
            return product;

        } catch (error) {
            throw CustomError.internalServer( `${ error }` );
        }

    }

    async getAllProducts( paginationDto: PaginationDto ) {

        const { page, limit } = paginationDto;

        try {
            
            const [ total, products ] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip( ( page - 1 ) * limit )
                    .limit( limit )
                    // .populate( 'user' )
                    // .populate( 'category' )
                    // .populate([ 'user', 'category' ])
                    .populate([ 'user', { path: 'category', populate: 'user' } ])
            ]);

            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/products?page=${ ( page + 1 ) }&limit=${ limit }`,
                prev: ( page - 1 > 0 ) ? `/api/products?page=${ ( page - 1 ) }&limit=${ limit }` : null,
                products: products,
            }


        } catch (error) {
            throw CustomError.internalServer( 'Internal Server Error' );
        }
    }

}