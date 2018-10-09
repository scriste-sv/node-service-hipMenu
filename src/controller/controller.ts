import { Restaurant } from './../model/model';
import * as mongoose from 'mongoose';
import { resolve } from 'path';

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

    //Menu
    public readMenu(id: number): Promise<IMenu> {
        return new Promise((resolve, reject) => {
            Restaurant.find({ "menu._id": id }, (err: Object, entities: IRestaurant[]) => {
                if (err) {
                    return reject(err);    
                }
                entities.forEach((list: IRestaurant) => {
                    list.menu.forEach((menu: IMenu) => {
                        if (menu._id == id) {
                            return resolve(menu);
                        }
                    })
                })
                
            });
        })
    }

    public readAllMenus(): Promise<IMenu[]> {
        return new Promise((resolve, reject) => {
            Restaurant.find((err: Object, entities: IRestaurant[]) => {
                if (err) {
                    return reject(err);    
                }
                const result = [].concat.apply([], entities.map((list: IRestaurant) => {
                    return list.menu.map((menu: IMenu) => {
                        return menu;
                    });
                }));
                return resolve(result);
            });
        })
    }

    public createMenu(id: string, data: Object) {
        return new Promise((resolve, reject) => {
            Restaurant.updateOne({_id: id}, {$push : {menu: data}}, (err: Object, menu: IMenu) => {
                if(err) {
                    return reject(err);
                }
                return resolve(menu);
            });
        });
    }

    public updateMenu(id: string, data: {name: string}) {
        return new Promise((resolve, reject) => {
            Restaurant.updateOne(
                { "menu": { "$elemMatch": { "_id": id }}},
                { "$set": { "menu.$": {"_id": id , "name": data.name}}},
                (err: Object, menu: IRestaurant) =>{
                    if(err) {
                        return reject(err);
                    }
                    return resolve(menu);
                }
            );
        })
    }

    public deleteMenu(id: number) {
        return new Promise((resolve, reject) => {
            Restaurant.updateOne(
                { "menu": { "$elemMatch": { "_id": id }}},
                { "$pull": { "menu": { "_id": id }}},
                (err: Object, menu: IRestaurant) => {
                    if(err) {
                        return reject(err);
                    }
                    return resolve(menu);
            });
        });
    }

}
