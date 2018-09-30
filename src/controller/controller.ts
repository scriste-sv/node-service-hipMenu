import { Restaurant } from './../model/model';
import * as mongoose from 'mongoose';

export class ControllerRestaurant {

    public create(body: any): Promise<object> {
        const restaurant = new Restaurant(body);
        return new Promise((resolve, reject) => {
            restaurant.save((err, restaurant) => {
                if (err) {
                    reject(err);
                }
                resolve(restaurant);
            });
        });    
    }

    public read(id: any): Promise<Document> {
        return new Promise((resolve, reject) => {
            Restaurant.findOne({ _id: id }, (err, restaurant) => {
                if (err) {
                    reject(err);    
                }
                resolve(<any>restaurant);
            });
        });
    } 

    public readAll(): Promise<mongoose.Document[]> {
        return new Promise((resolve, reject) => {
            Restaurant.find((err, menus) => {
                if (err) {
                    reject(err);
                }
                resolve(menus);
            });
        });
    }

    public update(id: any, body: any) {
        return new Promise((resolve, reject) => { 
            Restaurant.updateOne({ _id: id }, body, (err, restaurant) => {
                if(err) {
                    reject(err);
                }
                resolve(restaurant);
            });
        });
    }

    public delete(id: any): Promise<Document> {
        return new Promise((resolve, reject) => {
            Restaurant.findByIdAndDelete({ _id: id }, (err, restaurant) => {
                if(err) {
                   reject(err);
                }
                resolve(<any>restaurant);
            });
        });
    }

}