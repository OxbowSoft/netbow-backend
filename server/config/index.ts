import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './route';

export default class App {
    public express;

    constructor(private dependency: {[x: string]: Object}) {
        this.express = express();
        this.middleware();
        this.mountRoutes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private mountRoutes(): void {
        const router = express.Router();
        routes.forEach((route) => {
            switch(route.method){
                case 'get':
                    router.get(route.path, (req, res) => route.actions(req, res, this.dependency)); 
                case 'post':
                    router.post(route.path, (req, res) => route.actions(req, res, this.dependency)); 
                case 'delete':
                    router.delete(route.path, (req, res) => route.actions(req, res, this.dependency)); 
                case 'put':
                    router.put(route.path, (req, res) => route.actions(req, res, this.dependency)); 
            }
        });
        this.express.use('/', router);
    }
}