import { AuthRepository } from "../../repositories";


export interface ValidateEmailUserUseCase {

    execute( token: string ): Promise<Boolean>;
}

export class ValidateEmailUser implements ValidateEmailUserUseCase {

    constructor(
        private readonly repository: AuthRepository,
    ) {}

    execute( token: string ): Promise<Boolean> {
        return this.repository.validateEmail( token );
    }

}