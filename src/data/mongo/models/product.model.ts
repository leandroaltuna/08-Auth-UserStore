import mongoose, { Schema } from 'mongoose';


const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required' ],
    },
    available: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },

    user: {
        type: Schema.Types.ObjectId, // Hace referencia a un ID de la base de datos (mongodb)
        ref: 'User', // Hace referencia al schema o tabla User
        required: true,
    },

    category: {
        type: Schema.Types.ObjectId, // Hace referencia a un ID de la base de datos (mongodb)
        ref: 'Category', // Hace referencia al schema o tabla Category
        required: true,
    }
    
});


export const ProductModel = mongoose.model( 'Product', productSchema );