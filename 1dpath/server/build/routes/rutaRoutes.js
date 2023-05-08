"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutaController_1 = __importDefault(require("../controllers/rutaController"));
class RutaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', rutaController_1.default.index);
        this.router.get('/list', rutaController_1.default.list);
        this.router.get('/linea/:id', rutaController_1.default.getOne);
        // this.router.post('/', rutaController.create);
        // this.router.put('/:id', rutaController.update);
        // this.router.delete('/:id', rutaController.delete);
    }
}
exports.default = new RutaRoutes().router;
