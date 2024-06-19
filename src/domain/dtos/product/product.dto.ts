import { Validators } from "../../../config";



export class ProductDto {

    private constructor(
        
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string,

    ) {}

    static create( props: { [key:string] : any } ) : [ string?, ProductDto? ] {

        const { name, available, price, description, user, category } = props;

        if ( !name ) return [ 'Missing name' ];

        if ( !user ) return [ 'Missing user' ];
        if ( !Validators.isMongoID( user ) ) return [ 'Invalid User Id' ];

        if ( !category ) return [ 'Missing category' ];
        if ( !Validators.isMongoID( category ) ) return [ 'Invalid Category Id' ];
        
        return [ 
            undefined, 
            new ProductDto(
                name,
                !!available, // Doble negacion.
                price,
                description,
                user,
                category,
            )
        ];
    }



}