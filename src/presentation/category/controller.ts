import { Request, Response } from "express";
import { CategoryDto, CategoryRepository, CreateCategory, CustomError, GetCategories, PaginationDto } from "../../domain";
// import { CategoryService } from "../services";


export class CategoryController {

    constructor(
        // private readonly categoryService: CategoryService,
        private readonly categoryRepository: CategoryRepository,
    ) {}

    private handleError = ( error: unknown, res: Response ) => {

        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message });
        }

        console.log( `${ error }` );
        return res.status( 500 ).json({ error: 'Internal Server error' });

    }

    createCategory = ( req: Request, res: Response ) => {

        const [ error, categoryDto ] = CategoryDto.create( req.body );
        if ( error ) return res.status( 400 ).json({ error: error });

        // this.categoryService.createCategory( categoryDto!, req.body.user )
        //     .then( newcategory => res.status( 201 ).json( newcategory ) )
        //     .catch( error => this.handleError( error, res ) );

        new CreateCategory( this.categoryRepository )
            .execute( categoryDto!, req.body.user )
            .then( newcategory => res.status( 201 ).json( newcategory ) )
            .catch( error => this.handleError( error, res ) );

    }

    getCategories = ( req: Request, res: Response ) => {

        const { page = 1, limit = 10 } = req.query;
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit );

        if ( error ) return res.status( 400 ).json({ error });

        // this.categoryService.getCategories( paginationDto! )
        //     .then( categories => res.json( categories ) )
        //     .catch( error => this.handleError( error, res ) );

        new GetCategories( this.categoryRepository )
            .execute( paginationDto! )
            .then( categories => res.json( categories ) )
            .catch( error => this.handleError( error, res ) );

    }

}