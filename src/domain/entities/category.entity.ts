import { CustomError } from "../errors/custom.error";
import { UserEntity } from "./user.entity";


export class CategoryEntity {

    constructor(
        public id: string,
        public name: string,
        public available: boolean,
        public user: UserEntity,
    ){}

    static fromObject( object: { [key:string]: any } ) {

        const { id, _id, name, available, user } = object;

        if ( !id && !_id ) {
            throw CustomError.badRequest( 'Missing id' );
        }

        if ( !name ) throw CustomError.badRequest( 'Missing name' );
        if ( available === undefined ) throw CustomError.badRequest( 'Missing available field' );
       
        return new CategoryEntity( id || _id, name, available, user );

    }

}