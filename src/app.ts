import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose'
import { Routes } from './routes/Routes';

export class App {
    public app: express.Application;
    public router: Routes =  new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.router.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    public configDatabase() {
        mongoose.Promise =  global.Promise;
    }
}