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
    config() {
        this.router.get('/', tramosController_1.default.index);
        this.router.get('/list', tramosController_1.default.list);
        this.router.get('/:id', tramosController_1.default.getOne);
        // this.router.post('/', tramosController.create);
        // this.router.put('/:id', tramosController.update);
        // this.router.delete('/:id', tramosController.delete);
    }
}
exports.default = new TramosRoutes().router;
