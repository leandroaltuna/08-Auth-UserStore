import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { AuthDatasource, AuthEntity, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "../../presentation/services/email.service";


export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly emailService: EmailService,
    ) {}

    async loginUser(loginUserDto: LoginUserDto): Promise<AuthEntity> {
        
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if ( !user ) throw CustomError.badRequest( 'Email do not exist' );

        const passwordMatch =  bcryptAdapter.compare( loginUserDto.password, user.password );
        // Hace comparacion estricta que el password haga match. Solo si el password no hace match entra la expecion.
        if ( !(passwordMatch === true) ) throw CustomError.badRequest( 'Password is not valid' );

        const { password, ...showUser } = UserEntity.fromObject( user );

        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
        if ( !token ) throw CustomError.internalServer( 'Error while creating JWT' );

        return new AuthEntity( showUser, token.toString() );

    }

    private sendEmailValidationLink = async( email: string ) => {

        const token = await JwtAdapter.generateToken({ email });
        if ( !token ) throw CustomError.internalServer( 'Error getting token' );

        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;
        const htmlBody = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${ link }">Validate your email: "${ email }"</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: htmlBody,
        };

        const isSent = await this.emailService.sendEmail( options );
        if ( !isSent ) throw CustomError.internalServer( 'Error sending email' );

        return true;

    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<AuthEntity> {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if ( existUser ) throw CustomError.badRequest( 'Email already exist' );

        try {
            
            const user = new UserModel( registerUserDto );

            // Encryptar password
            user.password = bcryptAdapter.hash( registerUserDto.password );

            await user.save();

            // Email de verificacion
            await this.sendEmailValidationLink( user.email );

            const { password, ...showUser } = UserEntity.fromObject( user );

            const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
            if ( !token ) throw CustomError.internalServer( 'Error while creating JWT' );
            
            // return {
            //     user: showUser,
            //     token: token,
            // };

            return new AuthEntity( showUser, token.toString() );

        } catch (error) {
            throw CustomError.internalServer( `${ error }` );
        }

    }
        
    async validateEmail(token: string): Promise<Boolean> {
        
        const payload = await JwtAdapter.validateToken( token );
        if ( !payload ) throw CustomError.unAuthorized( 'Invalid token' );

        const { email } = payload as { email: string };
        if ( !email ) throw CustomError.internalServer( 'Email not in token' );

        const user = await UserModel.findOne({ email });
        if ( !user ) throw CustomError.internalServer( 'Email not exists' );

        user.emailValidated = true;
        await user.save();

        return true;

    }
    
}