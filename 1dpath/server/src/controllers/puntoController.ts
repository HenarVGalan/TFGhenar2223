import { Request, Response } from 'express';
import db from '../database';

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

    public async setPuntos(req: Request, res: Response): Promise<any> {
        const tramo_puntosJSON = await db.query('Select ST_AsGeoJSON(ST_Points(geom))as multipoints, ogc_fid as idtramo  FROM public.network01_4326 ORDER BY idTramo');

        tramo_puntosJSON.forEach(async (punto: any) => {
            var coordenadas = JSON.parse(punto['multipoints']).coordinates;
            coordenadas.forEach(async (coord: any) => {
                await db.query("INSERT INTO public.punto (ogc_fid_tramo,x,y,geom) VALUES (" + punto.idtramo + "," + coord[0] + "," + coord[1] + ",(ST_SetSRID(ST_MakePoint(" + coord[0] + "," + coord[1] + "),4326)))");
            });
        });
    }

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
    public async setPeso(req: Request, res: Response): Promise<any> {
        //añadir a punto.peso 
        //interpolar()
    }

    //funcion: actualizar punto.estacionesnear.valor 
    public async setvalorEstaciones(req: Request, res: Response): Promise<any> {
        const { idpunto } = req.params;
        //llamar a funcion de aemet hay que pasarle el idema, getData(idema)
        // Para ese punto obtener estacionesnear, y para cada una getData, despues con lo que devuelva habrá que insertar valor
    }
    public async interpolar(req: Request, res: Response): Promise<any> {
        const { idpunto } = req.params;
        //hacer calculos entre los punto.estacionesnear.valor
        //devolver resultado de esos calculos
    }

}

const puntoController = new PuntoController();
export default puntoController;
