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
        res.json({ text: 'tramosController' });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramos = yield database_1.default.query('SELECT * FROM network01_4326');
            res.json(tramos);
        });
    }
    listGeoJson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramos = yield database_1.default.query('SELECT * FROM network01_4326');
            res.json(tramos);
            // ST_AsGeoJSON
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const lineas = yield database_1.default.query('SELECT * FROM public.network01_4326 WHERE ogc_fid=' + id);
            console.log(lineas.length);
            // res.json(lineas);
            if (lineas.length > 0) {
                return res.json(lineas[0]);
            }
            res.status(404).json({ text: "Ese tramo no exite" });
        });
    }
    //(http://localhost:3000/api/tramos//centroTramo',
    getCoordenadasCentroTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const { id } = req.params;
            //Primero sacamos un punto centro de cada tramo, punto formato geometría
            const centrosGEOM = yield database_1.default.query('Select ST_Centroid(geom) as centroTramo, ogc_fid as id FROM public.network01_4326');
            //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a 
            centrosGEOM.forEach((obj) => __awaiter(this, void 0, void 0, function* () {
                //console.log(obj.centrotramo);       
                const xY = yield database_1.default.query("SELECT ST_X('" + obj.centrotramo + "') as longitud , ST_Y('" + obj.centrotramo + "') as latitud");
                //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto centro
                xY.forEach((obj2) => __awaiter(this, void 0, void 0, function* () {
                    yield database_1.default.query('UPDATE public.network01_4326 set latitud=' + obj2.latitud + ' , longitud=' + obj2.longitud + '  WHERE ogc_fid=' + obj.id);
                    //console.log('UPDATE  public.network01_4326 set latitud='+ obj2.latitud+' , longitud='+ obj2.longitud+'  WHERE ogc_fid='+obj.id );
                }));
            }));
            //Cuarto mostramos como resultado las coordenadas del punto centro de todos los tramos
            const coordenadasCentroTramo = yield database_1.default.query('SELECT ogc_fid,longitud,latitud FROM public.network01_4326 ORDER BY ogc_fid ASC');
            res.json(coordenadasCentroTramo);
        });
    }
    getCoordenadasInicioTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero sacamos un punto inicio de cada tramo, punto formato geometría
            const inicioGEOM = yield database_1.default.query('Select ST_StartPoint(ST_LineMerge(geom)) as iniciotramo, ogc_fid as id FROM public.network01_4326');
            //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a 
            inicioGEOM.forEach((obj) => __awaiter(this, void 0, void 0, function* () {
                //console.log(obj);
                const xY = yield database_1.default.query("SELECT ST_X('" + obj.iniciotramo + "') as longitud , ST_Y('" + obj.iniciotramo + "') as latitud");
                // console.log(obj.inicioTramo);
                //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto inicio
                xY.forEach((obj2) => __awaiter(this, void 0, void 0, function* () {
                    yield database_1.default.query('UPDATE public.network01_4326 set puntoinicio_longitud=' + obj2.longitud + ' , puntoinicio_latitud=' + obj2.latitud + '  WHERE ogc_fid=' + obj.id);
                }));
            }));
            //Cuarto mostramos como resultado las coordenadas del punto inicio de todos los tramos
            const coordenadasInicioTramo = yield database_1.default.query('SELECT ogc_fid, puntoinicio_longitud,puntoinicio_latitud FROM public.network01_4326 ORDER BY ogc_fid ASC');
            res.json(coordenadasInicioTramo);
        });
    }
    getCoordenadasFinTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero sacamos un punto inicio de cada tramo, punto formato geometría
            const finGEOM = yield database_1.default.query('Select ST_EndPoint(ST_LineMerge(geom)) as fintramo, ogc_fid as id FROM public.network01_4326');
            //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a 
            finGEOM.forEach((obj) => __awaiter(this, void 0, void 0, function* () {
                //console.log(obj);
                const xY = yield database_1.default.query("SELECT ST_X('" + obj.fintramo + "') as longitud , ST_Y('" + obj.fintramo + "') as latitud");
                // console.log(obj.inicioTramo);
                //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto inicio
                xY.forEach((obj2) => __awaiter(this, void 0, void 0, function* () {
                    yield database_1.default.query('UPDATE public.network01_4326 set puntofin_longitud=' + obj2.longitud + ' , puntofin_latitud=' + obj2.latitud + '  WHERE ogc_fid=' + obj.id);
                }));
            }));
            //Cuarto mostramos como resultado las coordenadas del punto inicio de todos los tramos
            const coordenadasFinTramo = yield database_1.default.query('SELECT ogc_fid, puntofin_longitud,puntofin_latitud FROM public.network01_4326 ORDER BY ogc_fid ASC');
            res.json(coordenadasFinTramo);
        });
    }
    getinteseccionTramosPoligono(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero obtenemos los tramos
            const tramos = yield database_1.default.query('SELECT geom,ogc_fid  FROM public.network01_4326 ');
            //res.json(tramos);
            //Segundo para cada tramo hacemos la intersección , para obtener todos los polígonos por los que pasa cada tramo
            //la funcion  ST_Intersects devuelve true ó false. es decir le va pasando la geometria de cada tramo para ver si ese polígono la tiene
            tramos.forEach((obj) => __awaiter(this, void 0, void 0, function* () {
                //console.log("SELECT ogc_fid,dn  FROM vectorial_4326 WHERE ST_Intersects('" + obj.geom + "',geom)");
                var result = yield database_1.default.query("SELECT ogc_fid,dn  FROM vectorial_4326 WHERE ST_Intersects('" + obj.geom + "',geom)");
                // console.log(result);           
                //Tercero actualizamos la tabla
                yield database_1.default.query("UPDATE public.network01_4326 set poligonos='" + JSON.stringify(result) + "' WHERE ogc_fid=" + obj.ogc_fid);
                //console.log("UPDATE public.network01_4326 set poligonos='" +JSON.stringify(result)+ "' WHERE ogc_fid=" + obj.ogc_fid);
            }));
            //console.log(poligonos);
            //res.json(poligonos);
        });
    }
}
const tramosController = new TramosController();
exports.default = tramosController;
