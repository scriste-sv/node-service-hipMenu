import { Restaurant } from './../model/restaurant-model';
import * as mongoose from 'mongoose';

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

export class ControllerRestaurant {

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

    public update(id: string, data: Object): Promise<mongoose.Document> {
        return new Promise((resolve, reject) => { 
            Restaurant.updateOne({ _id: id }, data, (err: Object, restaurant: mongoose.Document) => {
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

    public search(data: any) {
        return new Promise((resolve, reject) => {
            console.log(new RegExp(data.name));
            Restaurant.find({name: new RegExp(data.name, 'i')}, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

}
