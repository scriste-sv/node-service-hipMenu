import { Request, Response } from 'express';
import * as express from 'express';
import { RestaurantController } from '../controllers/controller-restaurant'
import { MenuController } from '../controllers/controller-menu';
import { Crypto } from '../utils/hash';

export class Routes {

    public controllerRestaurant: RestaurantController =  new RestaurantController();
    public controllerMenu: MenuController =  new MenuController();
    public cript: Crypto = new Crypto();

    public routes(app: express.Application): void {

        // Restaurant 
        app.get('/restaurant/', async (req: Request, res: Response) => {
            try{
                const result = await this.controllerRestaurant.readAll();

                result.forEach(element => (<any>element).name = this.cript.encryptSHA1((<any>element).name));
                
                res.json(result);
            } catch(err) {
                res.send(err.message);
            }
        });

        app.get('/restaurant/:id', async (req: Request, res: Response) => {
            try{
                const result = await this.controllerRestaurant.read(req.params.id);
                
                (<any>result).owner = this.cript.encryptSHA1((<any>result).owner);
                
                res.json(result);
            } catch(err) {
                res.send(err.message);
            }
        });

        app.post('/restaurant/', async (req: Request, res: Response) => {
            try {
                const result = await this.controllerRestaurant.create(req.body);
             
                (<any>result).owner = this.cript.encryptMD5((<any>result).owner);

                res.status(200).json(result);
            } catch(err) {
                res.send(err.message);
            }
            
        });

        app.put('/restaurant/:id', async (req: Request, res: Response) => {
            try {
                const result = await this.controllerRestaurant.update(req.params.id, req.body);
                return res.status(200).json(result);                    
            } catch(err) {
                res.send(err.message);
            }
        });

        app.delete('/restaurant/:id', async (req: Request, res: Response) => {
            try {
                const result = await this.controllerRestaurant.delete(req.params.id);
                return res.status(200).json(result);                    
            } catch(err) {
                res.send(err.message);
            }
        });

        app.get('/search-restaurant', async (req: Request, res: Response) => {
            try {
                const result =await this.controllerRestaurant.search(req.query);
                return res.status(200).json(result);
            } catch(err) {
                res.send(err.message);
            }
        });

        // Menus
        app.get('/res-menu/:menuId', async (req: Request, res: Response) => {
            try {
                const result = await this.controllerMenu.readMenu(req.params.menuId);
                return res.status(200).json(result); 
            } catch(err) {
                res.send(err.message);
            }
        });

        app.get('/res-menu/', async (req: Request, res: Response) => {
            try {
                const result = await this.controllerMenu.readAllMenus();
                return res.status(200).json(result); 
            } catch(err) {
                res.send(err.message);
            }
        });

        app.post('/res-menu/:restaurantId', async (req: Request, res: Response) => {
            try {
                const result = await this.controllerMenu.createMenu(req.params.restaurantId, req.body);
                return res.status(200).json(result);
            } catch (err) {
                res.send(err.message);
            }
        });

        app.put('/res-menu/:menuId', async (req: Request, res: Response) => {
            try {
                const result = await this.controllerMenu.updateMenu(req.params.menuId, req.body);
                return res.status(200).json(result);
            } catch (err) {
                res.send(err.message);
            }
        });
        
        app.delete('/res-menu/:menuId', async (req: Request, res: Response) => {
            try {
                const result = await this.controllerMenu.deleteMenu(req.params.menuId);
                return res.status(200).json(result); 
            } catch(err) {
                res.send(err.message);
            }
        });
   }
}

