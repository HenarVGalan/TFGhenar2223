"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puntosController_1 = __importDefault(require("../controllers/puntosController"));
class PoligonoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //  this.app.use('/api/puntos', puntosRoutes); ->index
    config() {
        this.router.get('/', puntosController_1.default.index);
        // this.router.get('/list', poligonoController.list);
        //  this.router.get('/:id', poligonoController.getOne);
        // this.router.post('/', poligonoController.create);
        // this.router.put('/:id', poligonoController.update);
        // this.router.delete('/:id', poligonoController.delete);
    }
}
exports.default = new PoligonoRoutes().router;
