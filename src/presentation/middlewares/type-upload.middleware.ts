import { NextFunction, Request, Response } from "express";



export class TypeUploadMiddleware {

    static validTypes( validateType: string[] ) {

        return ( req: Request, res: Response, next: NextFunction ) => {
        
            // de la url ex: "/single/users" se obtiene "users" para validar el parameter type
            const type = req.url.split( '/' ).at(2) ?? '';

            if ( !validateType.includes( type ) ) {
                return res.status( 400 ).json({ error: `Invalid type: ${ type }, valid ones ${ validateType }` });
            }
    
            next();
    
        }

    }

}