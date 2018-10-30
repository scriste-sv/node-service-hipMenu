import { Restaurant } from './../model/restaurant-model';

interface IMenu {
    _id: number,
    name: string
}

export class MenuController {

    //Menu
    public readMenu(id: number) {
        const query: Object = { "menu._id": id };

        return Restaurant.find(query)
            .then(entities => {
                return entities.map((list) => {
                    return (<any>list).menu.map((menu: IMenu) => {
                        if (menu._id == id) {
                            return menu;
                        }
                    }).pop();
                }).pop();
            }) 
            .catch(err => {
                return err;
            });
    };

    public readAllMenus() {
        return Restaurant.find()
            .then(entities => {
                const result = [].concat.apply([], entities.map((list) => {
                    return (<any>list).menu.map((menu: IMenu) => {
                        return menu;
                    });
                }));
                return result;
            }) 
            .catch(err => {
                return err;
            });
    }

    public createMenu(id: string, data: Object) {
        const query: Object = {_id: id};

        return Restaurant.updateOne(query, {$push : {menu: data}})
            .then(result => {
                return result;
            }) 
            .catch(err => {
                return err;
            });
    }

    public updateMenu(id: string, data: {name: string}) {
        const query: Object = { "menu": { "$elemMatch": { "_id": id }}};
        const condition: Object = { "$set": { "menu.$": {"_id": id , "name": data.name}}};


        return Restaurant.updateOne(query,condition)
            .then(result => {
                return result;
            }) 
            .catch(err => {
                return err;
            });
    }

    public deleteMenu(id: number) {
        const query: Object = { "menu": { "$elemMatch": { "_id": id }}};
        const condition: Object = { "$pull": { "menu": { "_id": id }}};

        return Restaurant.updateOne(query, condition)
            .then(result => {
                return result;
            }) 
            .catch(err => {
                return err;
            });
    }
}