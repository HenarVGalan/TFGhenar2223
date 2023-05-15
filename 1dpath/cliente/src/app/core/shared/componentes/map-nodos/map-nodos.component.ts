import { Component, OnInit } from '@angular/core';
import { Map, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-nodos',
  templateUrl: './map-nodos.component.html',
  styleUrls: ['./map-nodos.component.scss']
})
export class MapNodosComponent {
  constructor(private http: HttpClient) { }
  groupGeoJson = new L.FeatureGroup();

  ngOnInit(): void {
    this.getDataFromApi();
  }

  getDataFromApi(): void {
    const url = 'http://localhost:3000/api/tramos/listGeoJson';
    this.http.get(url).subscribe((data: any) => {
      data.forEach((row: any) => {
        let data = JSON.parse(row.st_asgeojson);
        // console.log(data);
        L.geoJSON(data, {
          style: {
            color: 'purple'
          }
        }).addTo(this.groupGeoJson);

      });
      // console.log(data);
      this.showDataOnMap(data);
    });
  }
  showDataOnMap(data: any): void {
    const mapnodos = new Map('map-nodos').setView([38.9951, -1.8559], 7);
    
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapnodos);

    this.groupGeoJson.addTo(mapnodos);

  }
}