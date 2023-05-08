import express, { Router } from 'express';

import poligonoController from '../controllers/poligonoController';


class PoligonoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', poligonoController.index)
        this.router.get('/list', poligonoController.list);
         this.router.get('/:id', poligonoController.getOne);
        // this.router.post('/', poligonoController.create);
        // this.router.put('/:id', poligonoController.update);
        // this.router.delete('/:id', poligonoController.delete);
    }

}

export default new PoligonoRoutes().router;