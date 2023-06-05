import { Request, Response } from 'express';
import db from '../database';
import aemetController from './aemetController';

class PuntoController {

    public index(req: Request, res: Response) {
        res.json({ text: 'puntoController' });
    }

    public async list(req: Request, res: Response): Promise<void> {
        const puntos = await db.query("SELECT * FROM public.punto");
        res.json(puntos);
    }

    public async listpuntostramo(req: Request, res: Response): Promise<void> {
        const { idtramo } = req.params;
        const puntos = await db.query("SELECT * FROM public.punto WHERE punto.ogc_fid_tramo=" + idtramo);
        res.json(puntos);
    }

    public async getCoordenadasPuntostramo(req: Request, res: Response): Promise<any> {

        //const { id } = req.params;
        //Primero sacamos un punto centro de cada tramo, punto formato geometría
        const centrosGEOM = await db.query('Select ST_Centroid(geom) as centroTramo, ogc_fid as id FROM public.network01_4326');
        //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a 
        centrosGEOM.forEach(async (obj: any) => {
            //console.log(obj.centrotramo);       
            const xY = await db.query("SELECT ST_X('" + obj.centrotramo + "') as longitud , ST_Y('" + obj.centrotramo + "') as latitud");
            //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto centro
            xY.forEach(async (obj2: any) => {
                await db.query('UPDATE public.network01_4326 set latitud=' + obj2.latitud + ' , longitud=' + obj2.longitud + '  WHERE ogc_fid=' + obj.id);
                //console.log('UPDATE  public.network01_4326 set latitud='+ obj2.latitud+' , longitud='+ obj2.longitud+'  WHERE ogc_fid='+obj.id );
            });
        });

        //Cuarto mostramos como resultado las coordenadas del punto centro de todos los tramos
        const coordenadasCentroTramo = await db.query('SELECT ogc_fid,longitud,latitud FROM public.network01_4326 ORDER BY ogc_fid ASC');
        res.json(coordenadasCentroTramo);
    }

    //FUNCION entrada: geometría de un punto y de salidas las coordenadas
    //ST_Points
    //revisar esta funcion no se le pasan parámetros, solo es de insertar
    public async setPuntos(req: Request, res: Response): Promise<any> {
        const tramo_puntosJSON = await db.query('Select ST_AsGeoJSON(ST_Points(geom))as multipoints, ogc_fid as idtramo  FROM public.network01_4326 ORDER BY idTramo');

        tramo_puntosJSON.forEach(async (punto: any) => {
            var coordenadas = JSON.parse(punto['multipoints']).coordinates;
            coordenadas.forEach(async (coord: any) => {
                await db.query("INSERT INTO public.punto (ogc_fid_tramo,x,y,geom) VALUES (" + punto.idtramo + "," + coord[0] + "," + coord[1] + ",(ST_SetSRID(ST_MakePoint(" + coord[0] + "," + coord[1] + "),4326)))");
            });
        });
    }
    // to do refactorizar 
    public async getInicioTramo(req: Request, res: Response): Promise<any> {
        //Primero sacamos un punto inicio de cada tramo, punto formato geometría
        const inicioGeoJson = await db.query('Select puntoInicio_latitud as lat, puntoInicio_longitud as long FROM public.network01_4326');
        res.json(inicioGeoJson);

    }

    public async getFinTramo(req: Request, res: Response): Promise<any> {
        //Primero sacamos un punto inicio de cada tramo, punto formato geometría
        const finGeoJson = await db.query('Select puntoFin_latitud as lat, puntoFin_longitud as long FROM public.network01_4326');
        res.json(finGeoJson);
    }

    public async getEstaciones(req: Request, res: Response): Promise<any> {
        const puntos = await db.query('Select id as idp, x, y, geom FROM public.punto');
        puntos.forEach(async (punto: any) => {
            const estaciones = await db.query("SELECT idema,  ST_Distance('" + punto.geom + "',aemet.geom)*100 AS distancia FROM public.estaciones_aemet aemet WHERE ST_DWithin('" + punto.geom + "', aemet.geom, 0.4) ");
            await db.query("UPDATE public.punto set estacionesnear='" + JSON.stringify(estaciones) + "' WHERE id=" + punto.idp);
        });
    }

    //TO DO

    //funcion: actualizar punto.estacionesnear.valor 
    // Para ese punto obtener estacionesnear, y para cada una getData, despues con lo que devuelva habrá que insertar valor
    public async setvalorEstaciones(req: Request, res: Response): Promise<any> {
        const { idpunto } = req.params;
        const punto = await db.query("SELECT estacionesnear FROM public.punto WHERE punto.id=" + idpunto);
        // res.json(punto[0].estacionesnear);
        (punto[0].estacionesnear).forEach(async (estacion: any) => {
            //1 llamar a funcion de aemet hay que pasarle el idema, getData(idema)
            // const prec_estacion = aemetController.getData(estacion.idema);
            //const prec_estacion = 2;
            try {
                estacion.prec = aemetController.getData(estacion.idema);
            } catch (err) {
                console.error(err);
            }
            // console.log(estacion);

            //upate, sería algo así , habría que revisar como acceder a punto.estacionesnear. peso prec
            //await db.query("UPDATE public.punto set punto.estacionesnear.peso_prec=" + prec + " WHERE punto.id=" + idpunto+"AND punto.estacionesnear.idema= "+estacion.idema);
        });
        // res.json(punto[0].estacionesnear);
        // console.log(punto[0].estacionesnear);
        //  console.log(JSON.stringify(punto[0].estacionesnear));
        //2  insertar valor en la estacion cerca correspondiente del punto      
        await db.query("UPDATE public.punto set estacionesnear=' " + JSON.stringify(punto[0].estacionesnear) + "' WHERE id=" + idpunto);
        res.json(punto[0].estacionesnear);

    }
    //Con el punto que te pasan, calculamos su peso, a partir de valor de las estaciones cercanas
    //este valor pues será precipitacion es esa estación por ejemplo
    public async interpolar(req: Request): Promise<any> {
        const { idpunto } = req.params;
        let sumDistinv = 0;
        //estacion.valor ?
        let peso_prec = 0; //esto habría que factorizar, porque puede ser precipitacion o el peso de temperatura, etc
        const prec = 1;//esto es un ejemplo, punto.estacionesnear.peso (precitipitacion)
        const punto = await db.query("SELECT estacionesnear FROM public.punto WHERE punto.id=" + idpunto);
        console.log(punto[0].estacionesnear);

        (punto[0].estacionesnear).forEach(async (estacion: any) => {
            console.log(estacion.distancia);
            console.log(estacion.prec);
            sumDistinv += (1 / ((estacion.distancia) * (estacion.distancia)));
            console.log("1/d^2: " + (1 / ((estacion.distancia) * (estacion.distancia))));
            console.log("sumatorio  " + sumDistinv);
        });
        console.log("sumatorio final " + sumDistinv);
        (punto[0].estacionesnear).forEach(async (estacion: any) => {
            // 1/d^2
            const inv_dd = (1 / ((estacion.distancia) * (estacion.distancia)));
            // prec interpolada (sumatorio) = prec de esa estacion * {(1/d^2)/sumatorio(de 1/d^2)} 
            peso_prec += (estacion.prec) * (inv_dd / sumDistinv);
            console.log("w: " + ((inv_dd / sumDistinv)));
        });
        console.log("zj " + peso_prec);
        await db.query("UPDATE public.punto set peso_prec=" + peso_prec + " WHERE punto.id=" + idpunto);
    }

    public async touchGeom(req: Request, res: Response): Promise<any> {
        const puntos = await db.query("SELECT geom, id FROM public.punto ");
        let iguales;
        (puntos).forEach(async (punto: any) => {
            //console.log("Hola soy punto: " + punto.geom);
           // console.log("Select id , geom FROM public.punto punto2 WHERE ST_Touches('" + punto.geom + "', punto2.geom) ");
            iguales = await db.query("Select id , geom FROM public.punto punto2 WHERE ST_Touches('" + punto.geom + "', punto2.geom) ");
            // iguales += punto.id;
            console.log(iguales);
        });
        // res.json(iguales);
    }

}

const puntoController = new PuntoController();
export default puntoController;
