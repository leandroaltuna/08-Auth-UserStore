import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";


export class AuthController {


    // DI
    constructor(
        public readonly authService: AuthService,
    ) {}

    private handleError = ( error: unknown, res: Response ) => {

        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message });
        }

        console.log( `${ error }` );
        return res.status( 500 ).json({ error: 'Internal Server error' });

    }

    registerUser = ( req: Request, res: Response ) => {

        const [ error, registerUserDto ] = RegisterUserDto.create( req.body );
        if ( error ) return res.status( 400 ).json({ error: error });
        
        this.authService.registerUser( registerUserDto! )
            .then( ( user ) => res.json( user ) )
            .catch( error => this.handleError( error, res ) );

    }

    loginUser = ( req: Request, res: Response ) => {

        const [ error, loginUserDto ] = LoginUserDto.login( req.body );
        if ( error ) return res.status( 400 ).json({ error: error });

        this.authService.loginUser( loginUserDto! )
            .then( (user) => res.json( user ) )
            .catch( error => this.handleError( error, res ) );

    }

    validateEmail = ( req: Request, res: Response ) => {

        const { token } = req.params;
        
        this.authService.validateEmail( token )
            .then( () => res.json( 'Email was validated properly' ) )
            .catch( error => this.handleError( error, res ) );

    }

}