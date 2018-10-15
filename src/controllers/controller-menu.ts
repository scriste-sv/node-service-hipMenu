import { Restaurant } from './../model/restaurant-model';

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

export class MenuController {

    //Menu
    public readMenu(id: number): Promise<IMenu> {
        return new Promise((resolve, reject) => {
            const query: Object = { "menu._id": id };

            Restaurant.find(query, (err: Object, entities: IRestaurant[]) => {
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
            const query: Object = {_id: id};

            Restaurant.updateOne(query, {$push : {menu: data}}, (err: Object, menu: IMenu) => {
                if(err) {
                    return reject(err);
                }
                return resolve(menu);
            });
        });
    }

    public updateMenu(id: string, data: {name: string}) {
        return new Promise((resolve, reject) => {
            const query: Object = { "menu": { "$elemMatch": { "_id": id }}};
            const condition: Object = { "$set": { "menu.$": {"_id": id , "name": data.name}}};


            Restaurant.updateOne(query,condition,(err: Object, menu: IRestaurant) =>{
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
            const query: Object = { "menu": { "$elemMatch": { "_id": id }}};
            const condition: Object = { "$pull": { "menu": { "_id": id }}};

            Restaurant.updateOne(query, condition,(err: Object, menu: IRestaurant) => {
                if(err) {
                    return reject(err);
                }
                return resolve(menu);
            });
        });
    }
}