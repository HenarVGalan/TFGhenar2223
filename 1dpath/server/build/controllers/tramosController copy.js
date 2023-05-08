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
class TramosController {
    index(req, res) {
        // res.send('tramosController');
        // db.query('DESCRIBE tramos');
        res.json({ text: 'tramossRoutes' });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramos = yield database_1.default.query('SELECT * FROM network01_4326');
            res.json(tramos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //res.json({ text: 'GETONE tramossRoutes' });
            // console.log(id);
            //const lineas = await db.query('SELECT * FROM network01_4326 WHERE ogc_fid = ? ', [id]);
            const lineas = yield database_1.default.query('SELECT * FROM network01_4326 LIMIT 2 ');
            console.log(lineas.length);
            res.json(lineas);
            // if (lineas.length > 0) {
            //     return res.json(lineas[0]);
            // }
            // res.status(404).json({ text: "Esa línea de la tramos no exite" });
        });
    }
}
const tramosController = new TramosController();
exports.default = tramosController;
