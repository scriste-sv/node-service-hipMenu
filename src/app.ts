import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv';
import { Routes } from './routes/routes';
import { errorMiddleware } from './middlawares/error-middleware';

dotenv.config();

export class App {
    public app: express.Application;
    public router: Routes =  new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.router.routes(this.app);
        this.configDatabase();
    }

    private config(): void {
        this.app.use(errorMiddleware);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    public configDatabase() {
        //use promise db
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(<string>process.env.DB_MONGO, { useNewUrlParser: true }, err => {
            if (err) {
                throw new Error(err.message);
            }
            console.log('Connected to MongoDB...')
        });
    }
}