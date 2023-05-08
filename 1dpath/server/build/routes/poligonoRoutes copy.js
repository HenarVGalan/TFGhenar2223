"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const poligonoController_1 = __importDefault(require("../controllers/poligonoController"));
class PoligonoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', poligonoController_1.default.index);
        this.router.get('/list', poligonoController_1.default.list);
        this.router.get('/:id', poligonoController_1.default.getOne);
        // this.router.post('/', poligonoController.create);
        // this.router.put('/:id', poligonoController.update);
        // this.router.delete('/:id', poligonoController.delete);
    }
}
exports.default = new PoligonoRoutes().router;
