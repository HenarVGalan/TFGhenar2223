import express, { Router } from 'express';

import tramosController from '../controllers/tramosController';


class TramosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    // index.ts -> this.app.use('/api/tramos', tramosRoutes);
    config() {
        this.router.get('/', tramosController.index)
        this.router.get('/list', tramosController.list);
        this.router.get('/coordenadasCentroTramo', tramosController.getCoordenadasCentroTramo);
        this.router.get('/coordenadasInicioTramo', tramosController.getCoordenadasInicioTramo);
        this.router.get('/coordenadasFinTramo', tramosController.getCoordenadasFinTramo);
        this.router.get('/interseccion', tramosController.getinteseccionTramosPoligono);
        this.router.get('/:id', tramosController.getOne);
        // this.router.post('/', tramosController.create);
        // this.router.put('/:id', tramosController.update);
        // this.router.delete('/:id', tramosController.delete);
    }

}

export default new TramosRoutes().router;