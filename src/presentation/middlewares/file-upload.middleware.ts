import { NextFunction, Request, Response } from "express";



export class FileUploadMiddleware {

    static containFiles( req: Request, res: Response, next: NextFunction ) {

        if ( !req.files || Object.keys( req.files ).length === 0 ) {
            return res.status( 400 ).json({ error: 'No files were selected!' });
        }

        // If the req.files.file is not an array. Note: "file" is the name of the parameter or field 
        if ( !Array.isArray( req.files.file ) ) {
            req.body.files = [ req.files.file ]; // El object req.files.file lo asigno como un array al body.
        } else {
            req.body.files = req.files.file;
        }

        next();

    }

}