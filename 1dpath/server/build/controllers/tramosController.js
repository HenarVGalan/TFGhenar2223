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
            const tramos = yield database_1.default.query('SELECT st_asgeojson(geom)  FROM network01_4326');
            res.json(tramos);
            //Select st_asgeojson(st_makeline(st_makepoint(puntoinicio_longitud,puntoinicio_latitud), st_makepoint(puntofin_longitud,puntofin_latitud))) from public.network01_4326 limit 10
            // ST_AsGeoJSON
        });
    }
    listGeoJsonpuntos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramos = yield database_1.default.query('SELECT * FROM network01_4326');
            res.json(tramos);
            //Select st_asgeojson(st_makeline(st_makepoint(puntoinicio_longitud,puntoinicio_latitud), st_makepoint(puntofin_longitud,puntofin_latitud))) from public.network01_4326 limit 10
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
    // to do: este metodo actualizar, ponerlo igual inicio y fin
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
    // to do refactorizar (funcion , centro, inicio y fin , hacen lo mismo asique espabila )
    getCoordenadasInicioTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const inicioGEOM = yield database_1.default.query('Select ST_StartPoint(ST_LineMerge(geom)) as geominiciotramo, ogc_fid as id FROM public.network01_4326');
            inicioGEOM.forEach((tramo) => __awaiter(this, void 0, void 0, function* () {
                const xY = yield database_1.default.query("SELECT ST_X('" + tramo.geominiciotramo + "') as longitud , ST_Y('" + tramo.geominiciotramo + "') as latitud");
                //console.log(xY[0].longitud + '},{y=' + xY[0].latitud);
                tramo.pinicio = [{ "x": xY[0].longitud, "y": xY[0].latitud, "geom": tramo.geominiciotramo }];
                yield database_1.default.query("UPDATE public.network01_4326 set pinicio=' " + JSON.stringify(tramo.pinicio) + "' WHERE ogc_fid=" + tramo.id);
            }));
            const inicioTramo = yield database_1.default.query('SELECT ogc_fid, pinicio FROM public.network01_4326 ORDER BY ogc_fid ASC');
            res.json(inicioTramo);
        });
    }
    getCoordenadasFinTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const finGEOM = yield database_1.default.query('Select ST_EndPoint(ST_LineMerge(geom)) as geomfintramo, ogc_fid as id FROM public.network01_4326');
            finGEOM.forEach((tramo) => __awaiter(this, void 0, void 0, function* () {
                const xY = yield database_1.default.query("SELECT ST_X('" + tramo.geomfintramo + "') as longitud , ST_Y('" + tramo.geomfintramo + "') as latitud");
                // console.log(xY[0].longitud + '},{y=' + xY[0].latitud);
                tramo.pfinal = [{ "x": xY[0].longitud, "y": xY[0].latitud, "geom": tramo.geomfintramo }];
                yield database_1.default.query("UPDATE public.network01_4326 set pfinal=' " + JSON.stringify(tramo.pfinal) + "' WHERE ogc_fid=" + tramo.id);
            }));
            const finalTramo = yield database_1.default.query('SELECT ogc_fid, pfinal FROM public.network01_4326 ORDER BY ogc_fid ASC');
            res.json(finalTramo);
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
    getTramos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { x1, y1, x2, y2 } = req.params;
            const tramos = yield database_1.default.query('SELECT geom FROM public.network01_4326 WHERE ST_Intersects(ST_SetSRID((ST_MakeEnvelope(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', 4326)), 4326),geom)');
            res.json(tramos);
        });
    }
    getTramosObras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramosobras = yield database_1.default.query("Select st_asgeojson(geom) From public.network01_4326 Where tipo = 'OBRAS'");
            res.json(tramosobras);
        });
    }
    getTramosFerrocarril(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramosferrocarril = yield database_1.default.query("Select st_asgeojson(geom) From public.network01_4326 Where tipo = 'FERROCARRIL'");
            res.json(tramosferrocarril);
        });
    }
    setPeso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idtramo } = req.params;
            let peso_prec = 0;
            //1 Se obtienen los puntos de un tramo
            const puntos = yield database_1.default.query("SELECT * FROM public.punto WHERE punto.ogc_fid_tramo=" + idtramo);
            //2 sumatorio de los pesos 
            puntos.forEach((punto) => __awaiter(this, void 0, void 0, function* () {
                peso_prec += punto.peso_prec;
            }));
            //3 update 
            yield database_1.default.query("UPDATE public.network01_4326 set peso_prec='" + peso_prec + "' WHERE ogc_fid=" + idtramo);
        });
    }
    setConsecutivos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idtramo } = req.params;
            let peso_prec = 0;
            //1 Obtener punto final de ese tramo 
            const tramopfinal = yield database_1.default.query("SELECT pfinal, ogc_fid as idtramofinal FROM public.network01_4326 WHERE ogc_fid=" + idtramo);
            //2 Para ese punto final de ese tramo buscar los punto iniciales mas cercanos de otros tramos
            // console.log(tramopfinal[0].pfinal[0].geom);
            const tramos = yield database_1.default.query("SELECT pinicio FROM public.network01_4326 ");
            tramos.forEach((tramospinicio) => __awaiter(this, void 0, void 0, function* () {
                // console.log(tramospinicio.pinicio[0].geom);
                //  console.log("SELECT ogc_fid,  ST_Distance('" + tramopfinal[0].pfinal[0].geom + "', (network01.pinicio-> 0 ->> 'geom'))*100 AS distancia FROM public.network01_4326 network01 WHERE ST_DWithin('" + tramopfinal[0].pfinal[0].geom + "', (network01.pinicio-> 0 ->> 'geom'), 0.4) ");
                const cercanos = yield database_1.default.query("SELECT ogc_fid,  ST_Distance('" + tramopfinal[0].pfinal[0].geom + "', (network01.pinicio-> 0 ->> 'geom'))*100 AS distancia FROM public.network01_4326 network01 WHERE ST_DWithin('" + tramopfinal[0].pfinal[0].geom + "', (network01.pinicio-> 0 ->> 'geom'), 0.6) ");
                yield database_1.default.query("UPDATE public.network01_4326 set tramos_consecutivos='" + JSON.stringify(cercanos) + "' WHERE ogc_fid=" + tramopfinal[0].idtramofinal);
                res.json(cercanos);
            }));
            //tramos_consecutivos
            // console.log("SELECT ogc_fid,  ST_Distance('" + (tramo[0].pfinal[0].geom) + "',network01.pinicio[0].geom)*100 AS distancia FROM public.network01_4326 network01 WHERE ST_DWithin('" + (tramo[0].pfinal[0].geom) + "', network01.pinicio[0].geom, 0.4) ");
            // const cercanos = await db.query("SELECT ogc_fid,  ST_Distance('" + (tramo[0].pfinal[0].geom) + "',network01.pinicio[0].geom)*100 AS distancia FROM public.network01_4326 network01 WHERE ST_DWithin('" + (tramo[0].pfinal[0].geom) + "', network01.pinicio[0].geom, 0.4) ");
            //WHERE ST_DWithin('" + punto.geom + "', aemet.geom, 0.4)
            //ST_Distance('" + punto.geom + "',aemet.geom)*100 AS distancia
            //3 insertar en consecutivos los id de tramo encontrados 
            // await db.query("UPDATE public.network01_4326 set peso_prec='" + peso_prec + "' WHERE ogc_fid=" + idtramo);
        });
    }
}
const tramosController = new TramosController();
exports.default = tramosController;
