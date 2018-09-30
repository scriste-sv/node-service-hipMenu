import { Restaurant } from './../model/model';
import * as mongoose from 'mongoose';

export class ControllerRestaurant {

    public create(body: Object): Promise<mongoose.Document> {
        const restaurant = new Restaurant(body);
        return new Promise((resolve, reject) => {
            restaurant.save((err: Object, restaurant: mongoose.Document) => {
                if (err) {
                    reject(err);
                }
                resolve(restaurant);
            });
        });    
    }

    public read(id: string): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => {
            Restaurant.findOne({ _id: id }, (err: Object, restaurant: mongoose.Document) => {
                if (err) {
                    reject(err);    
                }
                resolve(restaurant);
            });
        });
    } 

    public readAll(): Promise<mongoose.Document[]> {
        return new Promise((resolve, reject) => {
            Restaurant.find((err: Object, restaurants: mongoose.Document[]) => {
                if (err) {
                    reject(err);
                }
                resolve(restaurants);
            });
        });
    }

    public update(id: string, body: Object): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => { 
            Restaurant.updateOne({ _id: id }, body, (err: Object, restaurant: mongoose.Document) => {
                if(err) {
                    reject(err);
                }
                resolve(restaurant);
            });
        });
    }

    public delete(id: string): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => {
            Restaurant.findByIdAndDelete({ _id: id }, {}, (err: Object, restaurant) => {
                if(err) {
                   reject(err);
                }
                resolve(<mongoose.Document>restaurant);
            });
        });
    }

}