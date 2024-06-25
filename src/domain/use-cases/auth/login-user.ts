import { LoginUserDto } from "../../dtos";
import { AuthEntity } from "../../entities";
import { AuthRepository } from "../../repositories";


export interface LoginUserUseCase {

    execute( dto: LoginUserDto ): Promise<AuthEntity>

}

export class LoginUser implements LoginUserUseCase {
   
    constructor(
        private readonly repository: AuthRepository,
    ) {}


    execute( dto: LoginUserDto  ): Promise<AuthEntity> {
        return this.repository.loginUser( dto );
    }

}