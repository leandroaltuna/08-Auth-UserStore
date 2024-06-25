import { LoginUserDto, RegisterUserDto } from "../dtos";
import { AuthEntity } from "../entities";


export abstract class AuthDatasource {
    
    abstract registerUser( registerUserDto: RegisterUserDto ): Promise<AuthEntity>;

    abstract loginUser( loginUserDto: LoginUserDto ): Promise<AuthEntity>;

    abstract validateEmail( token: string ): Promise<Boolean> ;

}