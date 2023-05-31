import { Request, Response } from 'express';
import fetch from 'node-fetch';
import db from '../database';

class AemetController {

    public index(req: Request, res: Response) {
        res.json({ text: 'Aemet Controller' });
    }

    public async getData(req: Request, res: Response): Promise<void> {
        const { idema } = req.params;
        const url = "https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/2023-05-28T00%3A00%3A00UTC/fechafin/2023-05-28T23%3A00%3A00UTC/estacion/2829B";
        try {
            await fetch("https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/2023-05-25T00:00:00UTC/fechafin/2023-05-26T23:59:59UTC/estacion/" + idema + "/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5hci52ZWxhc2NvMUBhbHUudWNsbS5lcyIsImp0aSI6ImNhZDJmZDk2LTA4MDctNGMyMy05ZmIzLTJkMjFkNGUxNjBkNCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjg1MDk1MTk2LCJ1c2VySWQiOiJjYWQyZmQ5Ni0wODA3LTRjMjMtOWZiMy0yZDIxZDRlMTYwZDQiLCJyb2xlIjoiIn0.eOvtg2o-bfmL_JesnFGbE_bgZsWT5naIKMhTPg77o5E")
                .then(res => res.json())
                .then(async response => {
                    console.log(response.datos);
                    // Obtener el enlace al fichero
                    const fileUrl = response.datos;
                    if (!fileUrl) {
                        throw new Error('No se encontró el enlace al fichero');
                    }
                    // Descargar el fichero
                    const fileResponse = await fetch(fileUrl);
                    if (!fileResponse.ok) {
                        throw new Error(`Error al descargar el fichero! status: ${fileResponse.status}`);
                    }
                    // Leer el contenido del fichero
                    //console.log(fileResponse);
                    const fileContent = await fileResponse.text();
                    aemetController.insertData(JSON.parse(fileContent));

                })
        } catch (err) {
            console.log(err);
        }
    }
    //todo un metodo que reciba por parámetro fileContent
    // //borre/sobreescritir/ e inserte nuevos datos

    public async insertData(fileContent: any): Promise<void> {
        console.log(fileContent);
        if (!Array.isArray(fileContent)) {
            throw new Error('El contenido del archivo no es un array válido.');
        }

        fileContent.forEach(async (estacion: any) => {
            console.log("INSERT INTO public.valores_climatologicos (fecha, indicativo, nombre, provincia, altitud, tmed, prec, tmin, horatmin, tmax, horatmax, dir, velmedia, racha, horaracha, presmax, horapresmax, presmin, horapresmin) VALUES ('" + estacion.fecha + "','" + estacion.indicativo + "','" + estacion.nombre + "','" + estacion.provincia + "',(" + estacion.altitud + "),(" + parseFloat(estacion.tmed) + "),(" + parseFloat(estacion.prec) + "),(" + parseFloat(estacion.tmin) + "),'" + (estacion.horatmin) + "',(" + parseFloat(estacion.tmax) + "),'" + estacion.horatmax + "',(" + estacion.dir + "),(" + parseFloat(estacion.velmedia) + "),(" + parseFloat(estacion.racha) + "),'" + estacion.horaracha + "',(" + parseFloat(estacion.presMax) + "),(" + estacion.horaPresMax + "),(" + parseFloat(estacion.presMin) + "),(" + estacion.horaPresMin + "))");
              
            await db.query("INSERT INTO public.valores_climatologicos (fecha, indicativo, nombre, provincia, altitud, tmed, prec, tmin, horatmin, tmax, horatmax, dir, velmedia, racha, horaracha, presmax, horapresmax, presmin, horapresmin) VALUES ('" + estacion.fecha + "','" + estacion.indicativo + "','" + estacion.nombre + "','" + estacion.provincia + "',(" + estacion.altitud + "),(" + parseFloat(estacion.tmed) + "),(" + parseFloat(estacion.prec) + "),(" + parseFloat(estacion.tmin) + "),'" + (estacion.horatmin) + "',(" + parseFloat(estacion.tmax) + "),'" + estacion.horatmax + "',(" + estacion.dir + "),(" + parseFloat(estacion.velmedia) + "),(" + parseFloat(estacion.racha) + "),'" + estacion.horaracha + "',(" + parseFloat(estacion.presMax) + "),(" + estacion.horaPresMax + "),(" + parseFloat(estacion.presMin) + "),(" + estacion.horaPresMin + "))");

        });
    } 



}

const aemetController = new AemetController();
export default aemetController;