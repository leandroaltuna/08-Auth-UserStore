import { regularExps } from "../../../config";



export class RegisterUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create( object: { [key:string]: any } ) : [ string?, RegisterUserDto? ] {

        const { name, email, password } = object;

        if ( !name ) return [ 'Missing name field', undefined ];
        if ( !email ) return [ 'Missing email field', undefined ];
        if ( !regularExps.email.test( email ) ) return [ 'Email is not valid', undefined ];
        if ( !password ) return [ 'Missing password field', undefined ];
        if ( password.length < 6 ) return [ 'Password is too short' ];

        return [ undefined, new RegisterUserDto( name, email, password ) ];

    }

}