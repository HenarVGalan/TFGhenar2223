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
        res.json({ text: 'puntoController' });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const puntos = yield database_1.default.query("SELECT * FROM public.punto");
            res.json(puntos);
        });
    }
    listpuntostramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idtramo } = req.params;
            const puntos = yield database_1.default.query("SELECT * FROM public.punto WHERE punto.ogc_fid_tramo=" + idtramo);
            res.json(puntos);
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
    setPuntos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramo_puntosJSON = yield database_1.default.query('Select ST_AsGeoJSON(ST_Points(geom))as multipoints, ogc_fid as idtramo  FROM public.network01_4326 ORDER BY idTramo');
            tramo_puntosJSON.forEach((punto) => __awaiter(this, void 0, void 0, function* () {
                var coordenadas = JSON.parse(punto['multipoints']).coordinates;
                coordenadas.forEach((coord) => __awaiter(this, void 0, void 0, function* () {
                    yield database_1.default.query("INSERT INTO public.punto (ogc_fid_tramo,x,y,geom) VALUES (" + punto.idtramo + "," + coord[0] + "," + coord[1] + ",(ST_SetSRID(ST_MakePoint(" + coord[0] + "," + coord[1] + "),4326)))");
                }));
            }));
        });
    }
    getInicioTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero sacamos un punto inicio de cada tramo, punto formato geometría
            const inicioGeoJson = yield database_1.default.query('Select puntoInicio_latitud as lat, puntoInicio_longitud as long FROM public.network01_4326');
            res.json(inicioGeoJson);
        });
    }
    getFinTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero sacamos un punto inicio de cada tramo, punto formato geometría
            const finGeoJson = yield database_1.default.query('Select puntoFin_latitud as lat, puntoFin_longitud as long FROM public.network01_4326');
            res.json(finGeoJson);
        });
    }
    getEstaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const puntos = yield database_1.default.query('Select id as idp, x, y, geom FROM public.punto');
            puntos.forEach((punto) => __awaiter(this, void 0, void 0, function* () {
                const estaciones = yield database_1.default.query("SELECT idema,  ST_Distance('" + punto.geom + "',aemet.geom)*100 AS distancia FROM public.estaciones_aemet aemet WHERE ST_DWithin('" + punto.geom + "', aemet.geom, 0.4) ");
                yield database_1.default.query("UPDATE public.punto set estacionesnear='" + JSON.stringify(estaciones) + "' WHERE id=" + punto.idp);
            }));
        });
    }
    //TO DO
    setPeso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //añadir a punto.peso 
            //interpolar()
        });
    }
    //funcion: actualizar punto.estacionesnear.valor 
    setvalorEstaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idpunto } = req.params;
            //llamar a funcion de aemet hay que pasarle el idema, getData(idema)
            // Para ese punto obtener estacionesnear, y para cada una getData, despues con lo que devuelva habrá que insertar valor
        });
    }
    interpolar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idpunto } = req.params;
            //hacer calculos entre los punto.estacionesnear.valor
            //devolver resultado de esos calculos
        });
    }
}
const puntoController = new PuntoController();
exports.default = puntoController;
