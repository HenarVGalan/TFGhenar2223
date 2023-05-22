import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Punto } from '../../models/Punto';
import { Tramo } from '../../models/Tramo';

@Injectable({
  providedIn: 'root'
})
export class TramoService {
  API_URI = 'http://localhost:3000/api/tramos';
  constructor(private http: HttpClient) { }
  
  getTramos() {
    return this.http.get(`${this.API_URI}/listGeoJson`);
  }
  getTramosObras() {
    return this.http.get(`${this.API_URI}/tramosObras`);
  }
  getTramosFerrocarril() {
    return this.http.get(`${this.API_URI}/tramosFerrocarril`);
  }
}
