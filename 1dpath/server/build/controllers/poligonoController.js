"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PoligonoController {
    index(req, res) {
        // res.send('tramosController');
        // db.query('DESCRIBE tramos');
        res.json({ text: 'poligonosController' });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramos = yield database_1.default.query('SELECT * FROM vectorial_4326');
            res.json(tramos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const poligono = yield database_1.default.query('SELECT * FROM vectorial_4326 WHERE fid =' + id);
            console.log(poligono.length);
            res.json(poligono);
            // if (poligono.length > 0) {
            //     return res.json(poligono[0]);
            // }
            // res.status(404).json({ text: "Esa línea de la tramos no exite" });
        });
    }
}
const poligonoController = new PoligonoController();
exports.default = poligonoController;
