import jwt from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SEED = envs.JWT_SEED;

// JWT = Json Web Token
export class JwtAdapter {

    static async generateToken( payload: any, duration: string = '2h' ) {

        return new Promise(( resolve ) => {

            jwt.sign( payload, JWT_SEED, { expiresIn: duration }, ( err, token ) => {

                if ( err ) return resolve( null );

                resolve( token );

            });

        });

    }

    // <T> means it a generic o generico. It will return a promise of T type or null
    static validateToken<T>( token: string ): Promise< T | null > {

        return new Promise( ( resolve ) => {

            jwt.verify( token, JWT_SEED, ( err, decoded ) => {

                if ( err ) return resolve( null );

                resolve( decoded as T );

            });

        });

    }

}