import mongoose, { Schema } from 'mongoose';


const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true,
    },
    available: {
        type: Boolean,
        default: false,
    },

    user: {
        type: Schema.Types.ObjectId, // Hace referencia a un ID de la base de datos (mongodb)
        ref: 'User', // Hace referencia al schema o tabla User
        required: true,
    }
    
});

categorySchema.set( 'toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function( doc, ret, options ) {
        delete ret._id;
    }
});


export const CategoryModel = mongoose.model( 'Category', categorySchema );