"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tramosController_1 = __importDefault(require("../controllers/tramosController"));
class TramosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    // index.ts -> this.app.use('/api/tramos', tramosRoutes);
    config() {
        this.router.get('/', tramosController_1.default.index);
        this.router.get('/list', tramosController_1.default.list);
        this.router.get('/listGeoJson', tramosController_1.default.listGeoJson);
        this.router.get('/coordenadasCentroTramo', tramosController_1.default.getCoordenadasCentroTramo);
        this.router.get('/coordenadasInicioTramo', tramosController_1.default.getCoordenadasInicioTramo);
        this.router.get('/coordenadasFinTramo', tramosController_1.default.getCoordenadasFinTramo);
        this.router.get('/interseccionPoligonos', tramosController_1.default.getinteseccionTramosPoligono);
        //getTramos
        this.router.get('/:x1/:y1/:x2/:y2', tramosController_1.default.getTramos);
        this.router.get('/tramosObras', tramosController_1.default.getTramosObras);
        this.router.get('/tramosFerrocarril', tramosController_1.default.getTramosFerrocarril);
        this.router.get('/setConsecutivos', tramosController_1.default.setConsecutivos);
        this.router.get('/consecutivos1', tramosController_1.default.consecutivos1);
        this.router.get('/consecutivos2', tramosController_1.default.consecutivos2);
        this.router.get('/consecutivos3', tramosController_1.default.consecutivos3);
        this.router.get('/consecutivos4', tramosController_1.default.consecutivos4);
        this.router.get('/interseccion', tramosController_1.default.interseccionTramos);
        this.router.get('/:id', tramosController_1.default.getOne);
        this.router.get('/:idtramo/setPeso', tramosController_1.default.setPeso);
        //interseccion
        // this.router.post('/', tramosController.create);
        // this.router.put('/:id', tramosController.update);
        // this.router.delete('/:id', tramosController.delete);
    }
}
exports.default = new TramosRoutes().router;
