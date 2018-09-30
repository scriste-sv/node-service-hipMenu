import { Request, Response } from 'express';
import * as express from 'express';
import { ControllerRestaurant } from '../controller/controller';

export class Routes {

    public controller: ControllerRestaurant =  new ControllerRestaurant();

    public routes(app: express.Application): void {

        app.get('restaurant/', async (req: Request, res: Response) => {
            try{
                const result = await this.controller.readAll();
                res.json(result);
            } catch(err) {
                res.send(err.message);
            }
        });
        app.get('/restaurant/:id', async (req: Request, res: Response) => {
            try{
                const result = await this.controller.read(req.params.id);
                res.json(result);
            } catch(err) {
                res.send(err.message);
            }
        });
        app.post('restaurant/', async (req: Request, res: Response) => {
            try {
                const result = await this.controller.create(req.body);
                res.status(200).json(result);
            } catch(err) {
                res.send(err.message);
            }
            
        });
        app.put('/restaurant/:id', async (req: Request, res: Response) => {
            try {
                const result = await this.controller.update(req.params.id, req.body);
                return res.status(200).json(result);                    
            } catch(err) {
                return err;
            }
        });
        app.delete('/restaurant/:id', async (req: Request, res: Response) => {
            const result = await this.controller.delete(req.params.id);
            res.send(result);
        })
   }
}

