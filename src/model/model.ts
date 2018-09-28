import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MenuSchema: mongoose.Schema = new Schema(
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

export const Menu: mongoose.Model<mongoose.Document> = mongoose.model('Menu', MenuSchema);