import { Menu } from './../model/model';

export class Controller {

    public create(body: any) {
        const menu = new Menu(body);
        menu.save((err, menu) => {
            if (err) {
                return err;
            }
            return menu;
        })
    }

    public read(id: any) {
        Menu.findById({ id: id }, (err, menu) => {
            if (err) {
                return err;
            }
            return menu;
        })
    } 

    public readAll() {
        Menu.find((err, menus) => {
            if (err) {
                return err;
            }
            return menus;
        })
    }

}