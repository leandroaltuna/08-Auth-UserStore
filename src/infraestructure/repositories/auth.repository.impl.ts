import { AuthDatasource, AuthEntity, AuthRepository, LoginUserDto, RegisterUserDto } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly datasource: AuthDatasource,
    ) {}

    loginUser( loginUserDto: LoginUserDto ): Promise<AuthEntity> {
        return this.datasource.loginUser( loginUserDto );
    }

    registerUser( registerUserDto: RegisterUserDto ): Promise<AuthEntity> {
        return this.datasource.registerUser( registerUserDto );
    }

    validateEmail( token: string ): Promise<Boolean> {
        return this.datasource.validateEmail( token );
    }
}