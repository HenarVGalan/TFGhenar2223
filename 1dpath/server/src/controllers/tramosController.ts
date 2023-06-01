import { Request, Response } from 'express';
import db from '../database';

class TramosController {

    public index(req: Request, res: Response) {
        res.json({ text: 'tramosController' });
    }

    public async list(req: Request, res: Response): Promise<void> {
        const tramos = await db.query('SELECT * FROM network01_4326');
        res.json(tramos);
    }

    public async listGeoJson(req: Request, res: Response): Promise<void> {
        const tramos = await db.query('SELECT st_asgeojson(geom)  FROM network01_4326');
        res.json(tramos);
        //Select st_asgeojson(st_makeline(st_makepoint(puntoinicio_longitud,puntoinicio_latitud), st_makepoint(puntofin_longitud,puntofin_latitud))) from public.network01_4326 limit 10
        // ST_AsGeoJSON
    }

    public async listGeoJsonpuntos(req: Request, res: Response): Promise<void> {
        const tramos = await db.query('SELECT * FROM network01_4326');
        res.json(tramos);
        //Select st_asgeojson(st_makeline(st_makepoint(puntoinicio_longitud,puntoinicio_latitud), st_makepoint(puntofin_longitud,puntofin_latitud))) from public.network01_4326 limit 10
        // ST_AsGeoJSON
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const lineas = await db.query('SELECT * FROM public.network01_4326 WHERE ogc_fid=' + id);
        console.log(lineas.length);
        // res.json(lineas);
        if (lineas.length > 0) {
            return res.json(lineas[0]);
        }
        res.status(404).json({ text: "Ese tramo no exite" });
    }

    //(http://localhost:3000/api/tramos//centroTramo',
    // to do: este metodo actualizar, ponerlo igual inicio y fin
    public async getCoordenadasCentroTramo(req: Request, res: Response): Promise<any> {
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
    // to do refactorizar (funcion , centro, inicio y fin , hacen lo mismo asique espabila )
    public async getCoordenadasInicioTramo(req: Request, res: Response): Promise<any> {

        const inicioGEOM = await db.query('Select ST_StartPoint(ST_LineMerge(geom)) as geominiciotramo, ogc_fid as id FROM public.network01_4326');
        inicioGEOM.forEach(async (tramo: any) => {
            const xY = await db.query("SELECT ST_X('" + tramo.geominiciotramo + "') as longitud , ST_Y('" + tramo.geominiciotramo + "') as latitud");
            //console.log(xY[0].longitud + '},{y=' + xY[0].latitud);
            tramo.pinicio = [{ "x": xY[0].longitud, "y": xY[0].latitud, "geom": tramo.geominiciotramo }];
            await db.query("UPDATE public.network01_4326 set pinicio=' " + JSON.stringify(tramo.pinicio) + "' WHERE ogc_fid=" + tramo.id);

        });
        const inicioTramo = await db.query('SELECT ogc_fid, pinicio FROM public.network01_4326 ORDER BY ogc_fid ASC');
        res.json(inicioTramo);
    }

    public async getCoordenadasFinTramo(req: Request, res: Response): Promise<any> {


        const finGEOM = await db.query('Select ST_EndPoint(ST_LineMerge(geom)) as geomfintramo, ogc_fid as id FROM public.network01_4326');
        finGEOM.forEach(async (tramo: any) => {
            const xY = await db.query("SELECT ST_X('" + tramo.geomfintramo + "') as longitud , ST_Y('" + tramo.geomfintramo + "') as latitud");
           // console.log(xY[0].longitud + '},{y=' + xY[0].latitud);
            tramo.pfinal = [{ "x": xY[0].longitud, "y": xY[0].latitud, "geom": tramo.geomfintramo }];
            await db.query("UPDATE public.network01_4326 set pfinal=' " + JSON.stringify(tramo.pfinal) + "' WHERE ogc_fid=" + tramo.id);

        });
        const finalTramo = await db.query('SELECT ogc_fid, pfinal FROM public.network01_4326 ORDER BY ogc_fid ASC');
        res.json(finalTramo);
    }

    public async getinteseccionTramosPoligono(req: Request, res: Response): Promise<any> {
        //Primero obtenemos los tramos
        const tramos = await db.query('SELECT geom,ogc_fid  FROM public.network01_4326 ');
        //res.json(tramos);
        //Segundo para cada tramo hacemos la intersección , para obtener todos los polígonos por los que pasa cada tramo
        //la funcion  ST_Intersects devuelve true ó false. es decir le va pasando la geometria de cada tramo para ver si ese polígono la tiene
        tramos.forEach(async (obj: any) => {
            //console.log("SELECT ogc_fid,dn  FROM vectorial_4326 WHERE ST_Intersects('" + obj.geom + "',geom)");
            var result = await db.query("SELECT ogc_fid,dn  FROM vectorial_4326 WHERE ST_Intersects('" + obj.geom + "',geom)");
            // console.log(result);           
            //Tercero actualizamos la tabla
            await db.query("UPDATE public.network01_4326 set poligonos='" + JSON.stringify(result) + "' WHERE ogc_fid=" + obj.ogc_fid);
            //console.log("UPDATE public.network01_4326 set poligonos='" +JSON.stringify(result)+ "' WHERE ogc_fid=" + obj.ogc_fid);
        });
        //console.log(poligonos);
        //res.json(poligonos);
    }

    public async getTramos(req: Request, res: Response): Promise<any> {
        const { x1, y1, x2, y2 } = req.params;
        const tramos = await db.query('SELECT geom FROM public.network01_4326 WHERE ST_Intersects(ST_SetSRID((ST_MakeEnvelope(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', 4326)), 4326),geom)');
        res.json(tramos);
    }

    public async getTramosObras(req: Request, res: Response): Promise<any> {

        const tramosobras = await db.query("Select st_asgeojson(geom) From public.network01_4326 Where tipo = 'OBRAS'");
        res.json(tramosobras);

    }
    public async getTramosFerrocarril(req: Request, res: Response): Promise<any> {
        const tramosferrocarril = await db.query("Select st_asgeojson(geom) From public.network01_4326 Where tipo = 'FERROCARRIL'");
        res.json(tramosferrocarril);

    }
    public async setPeso(req: Request, res: Response): Promise<any> {
        const { idtramo } = req.params;
        let peso_prec = 0;
        //1 Se obtienen los puntos de un tramo
        const puntos = await db.query("SELECT * FROM public.punto WHERE punto.ogc_fid_tramo=" + idtramo);
        //2 sumatorio de los pesos 
        puntos.forEach(async (punto: any) => {
            peso_prec += punto.peso_prec;
        });
        //3 update 
        await db.query("UPDATE public.network01_4326 set peso_prec='" + peso_prec + "' WHERE ogc_fid=" + idtramo);

    }
    public async setConsecutivos(req: Request, res: Response): Promise<any> {
        const { idtramo } = req.params;
        let peso_prec = 0;
        //1 Obtener punto final de ese tramo 
        const tramo = await db.query("SELECT * FROM public.network01_4326 WHERE ogc_fid=" + idtramo);
        //2 Para ese punto final de ese tramo buscar los punto iniciales mas cercanos de otros tramos
        console.log(tramo[0]);
        // const estaciones = await db.query("SELECT idema,  ST_Distance('" + punto.geom + "',aemet.geom)*100 AS distancia FROM public.estaciones_aemet aemet WHERE ST_DWithin('" + punto.geom + "', aemet.geom, 0.4) ");
        //WHERE ST_DWithin('" + punto.geom + "', aemet.geom, 0.4)
        //ST_Distance('" + punto.geom + "',aemet.geom)*100 AS distancia
        //3 insertar en consecutivos los id de tramo encontrados 

        // await db.query("UPDATE public.network01_4326 set peso_prec='" + peso_prec + "' WHERE ogc_fid=" + idtramo);

    }


}


const tramosController = new TramosController();
export default tramosController;
