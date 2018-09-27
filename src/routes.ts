import { Request, Response } from 'express';

export class Routes {
    public routes(app: any): void {
        app.get('/', (res: Response) => {
            res.status(200).send({
                message: 'Succesfull GET!'
            });
        });
        app.get('/meniu/:id', (req: Request, res: Response) => {
            res.send({
                id: req.params.id
            });
        });
        app.post('/', (req: Request, res: Response) => {
            res.send({
                message: req.body
            });
        });
        app.put('/meniu/:id', (req: Request, res: Response) => {
            return res.send({
                id: req.params.id,
                message: req.body
            });
        });
        app.delete('/meniu/:id', (req: Request, res: Response) => {
            res.send({
                id: req.params.id
            })
        })
   }
}

