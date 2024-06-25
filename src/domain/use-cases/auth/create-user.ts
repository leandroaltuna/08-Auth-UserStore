import { RegisterUserDto } from "../../dtos";
import { AuthEntity } from "../../entities";
import { AuthRepository } from "../../repositories";


export interface CreateUserUseCase {

    execute( dto: RegisterUserDto ): Promise<AuthEntity>

}

export class CreateUser implements CreateUserUseCase {
    
    constructor(
        private readonly repository: AuthRepository,
    ) {}
    
    execute(dto: RegisterUserDto): Promise<AuthEntity> {
        
        return this.repository.registerUser( dto );

    }

}