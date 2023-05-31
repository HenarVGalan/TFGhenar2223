"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aemetController_1 = __importDefault(require("../controllers/aemetController"));
class AemetRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //this.app.use('/api/aemet', aemetRoutes);
    config() {
        this.router.get('/', aemetController_1.default.index);
        this.router.get('/datos/:idema', aemetController_1.default.getData);
    }
}
const aemetRoutes = new AemetRoutes();
exports.default = aemetRoutes.router;
