// import { CustomError } from "../errors/custom.error";


// export class CategoryEntity {

//     constructor(
//         public id: string,
//         public name: string,
//         public available: boolean,
//     ){}

//     static fromObject( object: { [key:string]: any } ) {

//         const { id, _id, name, available } = object;

//         if ( !id && !_id ) {
//             throw CustomError.badRequest( 'Missing id' );
//         }

//         if ( !name ) throw CustomError.badRequest( 'Missing name' );
//         if ( !available ) throw CustomError.badRequest( 'Missing email' );
       
//         return new CategoryEntity( id || _id, name, available );

//     }

// }