import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Punto } from '../../models/Punto';
import { Tramo } from '../../models/Tramo';

@Injectable({
  providedIn: 'root'
})
export class PuntoService {
  API_URI = 'http://localhost:3000/api/punto';

  constructor(private http: HttpClient) { }

     //  this.app.use('/api/punto', puntosRoutes); ->index    
      // this.router.get('/', puntoController.index)
      // this.router.get('/list', puntoController.list);
      // this.router.get('/getCoordenadas', puntoController.getCoordenadas);
      // //getGeoJsonInicioTramo
      // this.router.get('/getGeoJsonInicioTramo', puntoController.getGeoJsonInicioTramo);
      // this.router.get('/getGeoJsonFinTramo', puntoController.getGeoJsonFinTramo);

      getpIniciopFin(){
        return this.http.get(`${this.API_URI}/getGeoJsonInicioTramo`);
     
      }
}
