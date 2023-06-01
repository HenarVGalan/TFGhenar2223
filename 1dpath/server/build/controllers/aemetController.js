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
const node_fetch_1 = __importDefault(require("node-fetch"));
class AemetController {
    index(req, res) {
        res.json({ text: 'Aemet Controller' });
    }
    getData(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idema } = req.params;
            const url = "https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/2023-05-28T00%3A00%3A00UTC/fechafin/2023-05-28T23%3A00%3A00UTC/estacion/2829B";
            try {
                yield (0, node_fetch_1.default)("https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/2023-05-25T00:00:00UTC/fechafin/2023-05-26T23:59:59UTC/estacion/" + idema + "/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5hci52ZWxhc2NvMUBhbHUudWNsbS5lcyIsImp0aSI6ImNhZDJmZDk2LTA4MDctNGMyMy05ZmIzLTJkMjFkNGUxNjBkNCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjg1MDk1MTk2LCJ1c2VySWQiOiJjYWQyZmQ5Ni0wODA3LTRjMjMtOWZiMy0yZDIxZDRlMTYwZDQiLCJyb2xlIjoiIn0.eOvtg2o-bfmL_JesnFGbE_bgZsWT5naIKMhTPg77o5E")
                    .then(res => res.json())
                    .then((response) => __awaiter(this, void 0, void 0, function* () {
                    console.log(response.datos);
                    // Obtener el enlace al fichero
                    const fileUrl = response.datos;
                    if (!fileUrl) {
                        throw new Error('No se encontró el enlace al fichero');
                    }
                    // Descargar el fichero
                    const fileResponse = yield (0, node_fetch_1.default)(fileUrl);
                    if (!fileResponse.ok) {
                        throw new Error(`Error al descargar el fichero! status: ${fileResponse.status}`);
                    }
                    // Leer el contenido del fichero
                    //console.log(fileResponse);
                    const fileContent = yield fileResponse.text();
                    aemetController.insertData(JSON.parse(fileContent));
                }));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    //todo un metodo que reciba por parámetro fileContent
    // //borre/sobreescritir/ e inserte nuevos datos
    ///datos/:idema', aemetController.getData);
    insertData(fileContent) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(fileContent);
            if (!Array.isArray(fileContent)) {
                throw new Error('El contenido del archivo no es un array válido.');
            }
            fileContent.forEach((estacion) => __awaiter(this, void 0, void 0, function* () {
                console.log(estacion.prec);
                return estacion.prec;
                // console.log("INSERT INTO public.valores_climatologicos (fecha, indicativo, nombre, provincia, altitud, tmed, prec, tmin, horatmin, tmax, horatmax, dir, velmedia, racha, horaracha, presmax, horapresmax, presmin, horapresmin) VALUES ('" + estacion.fecha + "','" + estacion.indicativo + "','" + estacion.nombre + "','" + estacion.provincia + "',(" + estacion.altitud + "),(" + parseFloat(estacion.tmed) + "),(" + parseFloat(estacion.prec) + "),(" + parseFloat(estacion.tmin) + "),'" + (estacion.horatmin) + "',(" + parseFloat(estacion.tmax) + "),'" + estacion.horatmax + "',(" + estacion.dir + "),(" + parseFloat(estacion.velmedia) + "),(" + parseFloat(estacion.racha) + "),'" + estacion.horaracha + "',(" + parseFloat(estacion.presMax) + "),(" + estacion.horaPresMax + "),(" + parseFloat(estacion.presMin) + "),(" + estacion.horaPresMin + "))");
                //await db.query("INSERT INTO public.valores_climatologicos (fecha, indicativo, nombre, provincia, altitud, tmed, prec, tmin, horatmin, tmax, horatmax, dir, velmedia, racha, horaracha, presmax, horapresmax, presmin, horapresmin) VALUES ('" + estacion.fecha + "','" + estacion.indicativo + "','" + estacion.nombre + "','" + estacion.provincia + "',(" + estacion.altitud + "),(" + parseFloat(estacion.tmed) + "),(" + parseFloat(estacion.prec) + "),(" + parseFloat(estacion.tmin) + "),'" + (estacion.horatmin) + "',(" + parseFloat(estacion.tmax) + "),'" + estacion.horatmax + "',(" + estacion.dir + "),(" + parseFloat(estacion.velmedia) + "),(" + parseFloat(estacion.racha) + "),'" + estacion.horaracha + "',(" + parseFloat(estacion.presMax) + "),(" + estacion.horaPresMax + "),(" + parseFloat(estacion.presMin) + "),(" + estacion.horaPresMin + "))");
            }));
        });
    }
}
const aemetController = new AemetController();
exports.default = aemetController;
