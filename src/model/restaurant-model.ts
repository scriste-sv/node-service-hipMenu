import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const menuSchema: mongoose.Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
)

const RestaurantSchema: mongoose.Schema = new Schema(
    {
        name: { 
            type: String, 
            required: true
        },
        type: {
            type: String,
            required: true
        },
        menu: [{
            type: menuSchema,
            required: true 
        }]
    }
);

export const Restaurant: mongoose.Model<mongoose.Document> = mongoose.model('Restaurant', RestaurantSchema);