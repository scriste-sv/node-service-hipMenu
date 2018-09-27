import { Request, Response } from 'express';

export class Routes {
    public routes(app: any): void {
        app.get('/', (res: Response) => {
            res.status(200).send({
                Message: 'Succesfull GET!'
            });
        });
        app.get('/meniu/:id', (req: Request, res: Response) => {
            res.send({
                Id: req.params.id
            });
        });
        app.post('/', (req: Request, res: Response) => {
            res.send({
                Message: req.body
            });
        });
        app.put('/meniu/:id', (req: Request, res: Response) => {
            return res.send({
                Id: req.params.id,
                Message: req.body
            });
        });
        app.delete('/meniu/:id', (req: Request, res: Response) => {
            res.send({
                Id: req.params.id
            })
        })
   }
}

