import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RestaurantSchema: mongoose.Schema = new Schema(
    {
        type: { 
            type: String, 
            required: true
        },
        main: {
            type: String,
            require: true
        }    

    }
);

export const Restaurant: mongoose.Model<mongoose.Document> = mongoose.model('Restaurant', RestaurantSchema);