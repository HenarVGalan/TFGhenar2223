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
        const tramos = await db.query('SELECT * FROM network01_4326');
        res.json(tramos);
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

    public async getCoordenadasInicioTramo(req: Request, res: Response): Promise<any> {

        //Primero sacamos un punto inicio de cada tramo, punto formato geometría
        const inicioGEOM = await db.query('Select ST_StartPoint(ST_LineMerge(geom)) as iniciotramo, ogc_fid as id FROM public.network01_4326');
        //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a 
        inicioGEOM.forEach(async (obj: any) => {
            //console.log(obj);
            const xY = await db.query("SELECT ST_X('" + obj.iniciotramo + "') as longitud , ST_Y('" + obj.iniciotramo + "') as latitud");
            // console.log(obj.inicioTramo);
            //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto inicio
            xY.forEach(async (obj2: any) => {

                await db.query('UPDATE public.network01_4326 set puntoinicio_longitud=' + obj2.longitud + ' , puntoinicio_latitud=' + obj2.latitud + '  WHERE ogc_fid=' + obj.id);
            });
        });
        //Cuarto mostramos como resultado las coordenadas del punto inicio de todos los tramos
        const coordenadasInicioTramo = await db.query('SELECT ogc_fid, puntoinicio_longitud,puntoinicio_latitud FROM public.network01_4326 ORDER BY ogc_fid ASC');
        res.json(coordenadasInicioTramo);
    }

    public async getCoordenadasFinTramo(req: Request, res: Response): Promise<any> {

        //Primero sacamos un punto inicio de cada tramo, punto formato geometría
        const finGEOM = await db.query('Select ST_EndPoint(ST_LineMerge(geom)) as fintramo, ogc_fid as id FROM public.network01_4326');
        //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a 
        finGEOM.forEach(async (obj: any) => {
            //console.log(obj);
            const xY = await db.query("SELECT ST_X('" + obj.fintramo + "') as longitud , ST_Y('" + obj.fintramo + "') as latitud");
            // console.log(obj.inicioTramo);
            //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto inicio
            xY.forEach(async (obj2: any) => {
                await db.query('UPDATE public.network01_4326 set puntofin_longitud=' + obj2.longitud + ' , puntofin_latitud=' + obj2.latitud + '  WHERE ogc_fid=' + obj.id);
            });
        });
        //Cuarto mostramos como resultado las coordenadas del punto inicio de todos los tramos
        const coordenadasFinTramo = await db.query('SELECT ogc_fid, puntofin_longitud,puntofin_latitud FROM public.network01_4326 ORDER BY ogc_fid ASC');
        res.json(coordenadasFinTramo);
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


}




const tramosController = new TramosController();
export default tramosController;
