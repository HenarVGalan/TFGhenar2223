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
class PuntoController {
    index(req, res) {
        // res.send('tramosController');
        // db.query('DESCRIBE tramos');
        res.json({ text: 'puntoController' });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero necesitamos la geometría de puntos aleatorios de cada tramo F
            //const puntosGEOM = await db.query("SELECT ST_AsGeoJSON(st_generatepoints(geom,5,1996)) as geojson, ogc_fid as id FROM public.network01_4326 LIMIT 2 ");
            // res.json(puntosGEOM);
            console.log("SELECT ST_AsGeoJSON(st_generatepoints(geom,5,1996)) as geojson, ogc_fid as id FROM public.network01_4326 LIMIT 2 ");
        });
    }
    getCoordenadasPuntostramo(req, res) {
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
    //FUNCION entrada: geometría de un punto y de salidas las coordenadas
    //ST_Points
    getCoordenadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramo_puntosCOORJSON = yield database_1.default.query('Select ST_Points(geom) as punto, ogc_fid as id FROM public.network01_4326');
            // ST_AsGeoJSON
            //console.log(puntoGEOM);
            //res.json(puntoGEOM);
            //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a puntos coordenadas
            // SELECT ST_X(ST_intersection(geom, geom)), ST_Y(ST_intersection(geom, geom))
            tramo_puntosCOORJSON.forEach((obj) => __awaiter(this, void 0, void 0, function* () {
                //console.log("SELECT ST_X('" + obj.punto + "') as longitud , ST_Y('" + obj.punto + "') as latitud");   
                // console.log("SELECT GeometryType('" + obj.punto + "')as geometríatipo ");    
                // const xY = await db.query("SELECT ST_X('" + obj.punto + "') as x , ST_Y('" + obj.punto + "') as y");
                //esto está mal , revisar
                const xY = yield database_1.default.query("SELECT ST_X(ST_intersection('" + obj.punto + "','" + obj.punto + "')) as x , ST_Y(ST_intersection('" + obj.punto + "','" + obj.punto + "')) as y");
                console.log("SELECT ST_X(ST_intersection('" + obj.punto + "','" + obj.punto + "')) as x , ST_Y(ST_intersection('" + obj.punto + "','" + obj.punto + "')) as y");
                // res.json(xY);
                //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto centro
                xY.forEach((obj2) => __awaiter(this, void 0, void 0, function* () {
                    //await db.query('UPDATE public.Punto set latitud=' + obj2.latitud + ' , longitud=' + obj2.longitud + '  WHERE ogc_fid=' + obj.id);
                    //await db.query('INSERT INTO public.punto set geom=' + tramo_puntosCOORJSON + ', y=' + obj2.y + ' , x=' + obj2.longitud + ' ogc_fidTramo=' + puntoGEOM.id);
                    //console.log('UPDATE  public.network01_4326 set latitud='+ obj2.latitud+' , longitud='+ obj2.longitud+'  WHERE ogc_fid='+obj.id );
                }));
            }));
        });
    }
    getGeoJsonInicioTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero sacamos un punto inicio de cada tramo, punto formato geometría
            const inicioGeoJson = yield database_1.default.query('Select st_asgeojson(ST_StartPoint(ST_LineMerge(geom))) as iniciotramo FROM public.network01_4326');
            res.json(inicioGeoJson);
            //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a 
            // inicioGEOM.forEach(async (obj: any) => {
            //     //console.log(obj);
            //     const xY = await db.query("SELECT ST_X('" + obj.iniciotramo + "') as longitud , ST_Y('" + obj.iniciotramo + "') as latitud");
            //     // console.log(obj.inicioTramo);
            //     //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto inicio
            //     xY.forEach(async (obj2: any) => {
            //         await db.query('UPDATE public.network01_4326 set puntoinicio_longitud=' + obj2.longitud + ' , puntoinicio_latitud=' + obj2.latitud + '  WHERE ogc_fid=' + obj.id);
            //     });
            // });
            // //Cuarto mostramos como resultado las coordenadas del punto inicio de todos los tramos
            // const coordenadasInicioTramo = await db.query('SELECT ogc_fid, puntoinicio_longitud,puntoinicio_latitud FROM public.network01_4326 ORDER BY ogc_fid ASC');
        });
    }
}
const puntoController = new PuntoController();
exports.default = puntoController;
