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
        this.router.get('/listGeoJson', tramosController.listGeoJson);
        this.router.get('/coordenadasCentroTramo', tramosController.getCoordenadasCentroTramo);
        this.router.get('/coordenadasInicioTramo', tramosController.getCoordenadasInicioTramo);
        this.router.get('/coordenadasFinTramo', tramosController.getCoordenadasFinTramo);
        this.router.get('/interseccionPoligonos', tramosController.getinteseccionTramosPoligono);
        //getTramos
        this.router.get('/:x1/:y1/:x2/:y2', tramosController.getTramos);
        this.router.get('/tramosObras', tramosController.getTramosObras);
        this.router.get('/tramosFerrocarril', tramosController.getTramosFerrocarril);
        
        this.router.get('/setConsecutivos', tramosController.setConsecutivos);
        this.router.get('/consecutivos1', tramosController.consecutivos1);
        this.router.get('/consecutivos2', tramosController.consecutivos2);
        this.router.get('/consecutivos3', tramosController.consecutivos3);
        this.router.get('/consecutivos4', tramosController.consecutivos4);

        this.router.get('/interseccion', tramosController.interseccionTramos);
        this.router.get('/:id', tramosController.getOne);
        this.router.get('/:idtramo/setPeso', tramosController.setPeso);
        //interseccion



        // this.router.post('/', tramosController.create);
        // this.router.put('/:id', tramosController.update);
        // this.router.delete('/:id', tramosController.delete);
    }

}

export default new TramosRoutes().router;