import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services";
import { UploadedFile } from "express-fileupload";


export class FileUploadController {

    constructor(
        private readonly fileUploadService: FileUploadService,
    ) {}

    private handleError = ( error: unknown, res: Response ) => {

        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message });
        }

        console.log( `${ error }` );
        return res.status( 500 ).json({ error: 'Internal Server error' });

    }

    uploadFile = ( req: Request, res: Response ) => {

        const file = req.body.files.at(0) as UploadedFile;
        const type = req.params.type; // .type es el parametro dentro del route /:type

        this.fileUploadService.uploadSingle( file, `uploads/${ type }` )
            .then( uploaded => res.json( uploaded ) )
            .catch( error => this.handleError( error, res ) );

    }

    uploadMultipleFiles = ( req: Request, res: Response ) => {

        const files = req.body.files as UploadedFile[];
        const type = req.params.type; // .type es el parametro dentro del route /:type

        this.fileUploadService.uploadMultiple( files, `uploads/${ type }` )
            .then( uploaded => res.json( uploaded ) )
            .catch( error => this.handleError( error, res ) );

    }


}