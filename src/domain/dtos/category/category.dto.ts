

export class CategoryDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ) {}

    static create( object: {[key: string] :  any} ) : [ string?, CategoryDto? ]  {

        const { name, available = false } = object;
        let availableBoolean = available;

        if ( !name ) return [ 'Missing name' ];
        // Si available property no es de tipo boolean
        if ( typeof available !== 'boolean' ) {
            // availableboolean will be true only if available property is true in string type, otherwise it will be false.
            availableBoolean = ( available === 'true' );
        }

        return [ undefined, new CategoryDto( name, availableBoolean ) ];

    } 

}