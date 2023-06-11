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
    public async getpiniciopfin(req: Request, res: Response): Promise<any> {

        // const inciofinalGeoJson = await db.query("Select pinicio->0->>'x' as piniciox ,pinicio->0->>'y' as pinicioy,  pinicio->0->>'geom' as geomi, pfinal->0->>'x' as pfinalx, pfinal->0->>'y' as pfinaly, pfinal->0->>'geom' as geomf, ogc_fid  FROM public.network01_4326");

        // inciofinalGeoJson.forEach(async (punto: any) => {
        //     //console.log("INSERT INTO public.nodo (x,y,geom,ogc_fid_tramo,tipo) VALUES ("+punto.piniciox+","+punto.pinicioy+",'"+punto.geom+"',"+ punto.ogc_fid+", 'inicio')");
        //     await db.query("INSERT INTO public.nodo (x,y,geom,ogc_fid_tramo,tipo) VALUES ("+punto.piniciox+","+punto.pinicioy+",'"+punto.geomi+"',"+ punto.ogc_fid+", 'inicio')");
        //     await db.query("INSERT INTO public.nodo (x,y,geom,ogc_fid_tramo,tipo) VALUES ("+punto.pfinalx+","+punto.pfinaly+",'"+punto.geomf+"',"+ punto.ogc_fid+", 'final')");

        // });
        const nodos = await db.query("Select x,y FROM public.nodo");
        res.json(nodos);
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
    public async setvalorEstaciones(idPunto: number): Promise<any> {

        console.log("setvalorestaciones: " + idPunto);
        const punto = await db.query("SELECT estacionesnear,geom,id FROM public.punto WHERE punto.id=" + idPunto);
        // res.json(punto[0].estacionesnear);
        console.log("puntos" + punto);
        (punto[0].estacionesnear).forEach(async (estacion: any) => {
            //1 llamar a funcion de aemet hay que pasarle el idema, getData(idema)
            // const prec_estacion = aemetController.getData(estacion.idema);
            //const prec_estacion = 2;
            try {
                // estacion.prec = aemetController.getData(estacion.idema);
                estacion.prec = puntoController.generarNumeroAleatorio();
                console.log("estacion_prec: " + estacion.prec);
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
        await db.query("UPDATE public.punto set estacionesnear=' " + JSON.stringify(punto[0].estacionesnear) + "' WHERE geom='" + punto[0].geom + "'");
        await puntoController.interpolar(idPunto);
        // res.json(punto[0].estacionesnear);

    }
    //Con el punto que te pasan, calculamos su peso, a partir de valor de las estaciones cercanas
    //este valor pues será precipitacion es esa estación por ejemplo
    public async interpolar(idPunto: number): Promise<any> {

        let sumDistinv = 0;
        //estacion.valor ?
        let peso_prec = 0; //esto habría que factorizar, porque puede ser precipitacion o el peso de temperatura, etc
        const prec = 1;//esto es un ejemplo, punto.estacionesnear.peso (precitipitacion)
        const punto = await db.query("SELECT estacionesnear,geom FROM public.punto WHERE punto.id=" + idPunto);
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
        await db.query("UPDATE public.punto set peso_prec=" + peso_prec + " WHERE geom='" + punto[0].geom + "'");
    }

    public async equalGeom(req: Request, res: Response): Promise<any> {
        const puntos = await db.query("SELECT geom, id,ogc_fid_tramo FROM public.punto ");
        let iguales;
        (puntos).forEach(async (punto: any) => {
            //console.log("Hola soy punto: " + punto.geom);
            // console.log("Select id , geom FROM public.punto punto2 WHERE ST_Touches('" + punto.geom + "', punto2.geom) ");
            iguales = await db.query("Select id, geom FROM public.punto punto2 WHERE ST_Equals('" + punto.geom + "', punto2.geom) and " + punto.ogc_fid_tramo + "<> punto2.ogc_fid_tramo ");
            // iguales += punto.id;
            console.log(iguales);
        });
        // res.json(iguales);
    }
    public generarNumeroAleatorio(): number {
        const min = 0; // Valor mínimo (incluido)
        const max = 50; // Valor máximo (incluido)

        const numeroAleatorio = Math.random() * (max - min) + min;
        const numeroAleatorioRedondeado = parseFloat(numeroAleatorio.toFixed(2));

        return numeroAleatorioRedondeado;
    }
    public async consecutivos1(req: Request, res: Response): Promise<any> {
        const tramospfinal = await db.query("SELECT pinicio, pfinal, ogc_fid as idtramofinal FROM public.network01_4326");

        tramospfinal.forEach(async (tramopfinal: any) => {
            // console.log(tramospinicio.pinicio[0].geom);
            // console.log("SELECT pfinal, ogc_fid  FROM public.network01_4326 network01 WHERE  ST_Equals('" + tramopfinal.pfinal[0].geom + "', (network01.pinicio-> 0 ->> 'geom')::geometry) AND " + tramopfinal.idtramofinal + "<> network01.ogc_fid ");
            const consecutivospinicio = await db.query("SELECT  ogc_fid as ogc_fid_tramo_consecutivo FROM public.network01_4326 network01  WHERE  (ST_Equals('" + tramopfinal.pinicio[0].geom + "', (network01.pfinal-> 0 ->> 'geom')::geometry) or ST_Equals('" + tramopfinal.pinicio[0].geom + "', (network01.pinicio-> 0 ->> 'geom')::geometry) ) AND " + tramopfinal.idtramofinal + " <> network01.ogc_fid ");
            const consecutivospfinal = await db.query("SELECT  ogc_fid as ogc_fid_tramo_consecutivo FROM public.network01_4326 network01  WHERE  (ST_Equals('" + tramopfinal.pfinal[0].geom + "', (network01.pinicio-> 0 ->> 'geom')::geometry) or ST_Equals('" + tramopfinal.pfinal[0].geom + "', (network01.pfinal-> 0 ->> 'geom')::geometry)) AND " + tramopfinal.idtramofinal + " <> network01.ogc_fid ");


            if (consecutivospinicio.length != 0) {
                const valoresConsecutivospinicio = consecutivospinicio.map((obj: { ogc_fid_tramo_consecutivo: any; }) => obj.ogc_fid_tramo_consecutivo);
                await db.query("UPDATE public.punto set ogc_fid_tramo_consecutivos= '{" + valoresConsecutivospinicio + "}' WHERE geom= '" + tramopfinal.pinicio[0].geom + "' and ogc_fid_tramo =" + tramopfinal.idtramofinal);
            }

            if (consecutivospfinal.length != 0) {
                const valoresConsecutivospfinal = consecutivospfinal.map((obj: { ogc_fid_tramo_consecutivo: any; }) => obj.ogc_fid_tramo_consecutivo);
                await db.query("UPDATE public.punto set ogc_fid_tramo_consecutivos= '{" + valoresConsecutivospfinal + "}' WHERE geom= '" + tramopfinal.pfinal[0].geom + "' and ogc_fid_tramo =" + tramopfinal.idtramofinal);
            }
        });
    }





}

const puntoController = new PuntoController();
export default puntoController;
