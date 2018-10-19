import { Restaurant } from './../model/restaurant-model';
import * as mongoose from 'mongoose';
import { filterRestaurants } from './../utils/filterRestaurants';

interface IMenu {
    _id: number,
    name: string
}
interface IRestaurant {
    _id: number,
    name: string,
    type: string,
    menu: IMenu[]
}

export class RestaurantController {

    //Restaurant
    public create(data: Object): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => {
            Restaurant.create(data, (err: Error, restaurant: mongoose.Document) => {
                if (err) {
                    reject(err);
                }
                resolve(restaurant);
            });
        });    
    }

    public read(id: string): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => {
            const query: Object = { _id: id };

            Restaurant.findOne(query, (err: Object, restaurant: mongoose.Document) => {
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

    public update(id: string, data: Object): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => { 
            const query: Object = { _id: id };

            Restaurant.updateOne(query, data, (err: Object, restaurant: mongoose.Document) => {
                if(err) {
                    reject(err);
                }
                resolve(restaurant);
            });
        });
    }

    public delete(id: string): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => {
            const query: Object = { _id: id };

            Restaurant.findByIdAndDelete(query, {}, (err: Object, restaurant) => {
                if(err) {
                   reject(err);
                }
                resolve(<mongoose.Document>restaurant);
            });
        });
    }

    public search(data: any) {
        return new Promise((resolve, reject) => {
            const queryName = data.name;
            const query: Object = { name: new RegExp(data.name, 'i') };
            
            Restaurant.find(query, (err, data) => {
                const result = filterRestaurants(data, queryName);
                
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

}
