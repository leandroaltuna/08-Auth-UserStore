import { CustomError } from "../errors/custom.error";
import { CategoryEntity } from "./category.entity";
import { UserEntity } from "./user.entity";


export class ProductEntity {

    constructor(

        public id: string,
        public name: string,
        public user: UserEntity,
        public category: CategoryEntity,
        public available?: boolean,
        public price?: number,
        public description?: string,

    ) {}

    static fromObject( object: { [key:string]: any } ) {

        const { _id, id, name, available, price, description, user, category } = object;

        if ( !_id && id ) throw CustomError.badRequest( 'Id is required' );
        if ( !name ) throw CustomError.badRequest( 'Name is required' );
        if ( !user ) throw CustomError.badRequest( 'User is required' );
        if ( !category ) throw CustomError.badRequest( 'Category is required' );
        if ( available === undefined ) throw CustomError.badRequest( 'Missing available' );
        
        return new ProductEntity( id || _id, name, user, category, available, price, description );

    }

}