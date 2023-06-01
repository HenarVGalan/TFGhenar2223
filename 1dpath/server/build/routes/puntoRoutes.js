"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puntoController_1 = __importDefault(require("../controllers/puntoController"));
class PuntoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //  this.app.use('/api/punto', puntosRoutes); ->index
    config() {
        this.router.get('/', puntoController_1.default.index);
        this.router.get('/list', puntoController_1.default.list);
        this.router.get('/list/:idtramo', puntoController_1.default.listpuntostramo);
        this.router.get('/getCoordenadas', puntoController_1.default.setPuntos);
        //getGeoJsonInicioTramo
        this.router.get('/getInicioTramo', puntoController_1.default.getInicioTramo);
        this.router.get('/getFinTramo', puntoController_1.default.getFinTramo);
        //getEstaciones
        this.router.get('/getEstaciones', puntoController_1.default.getEstaciones);
        this.router.get('/interpolar/:idpunto', puntoController_1.default.interpolar);
        //setvalorEstaciones
        this.router.get('/setvalorEstaciones/:idpunto', puntoController_1.default.setvalorEstaciones);
        //  this.router.get('/:id', puntoController.getOne);
        // this.router.post('/', puntoController.create);
        // this.router.put('/:id', puntoController.update);
        // this.router.delete('/:id', puntoController.delete);
    }
}
exports.default = new PuntoRoutes().router;
