import { Component, OnInit } from '@angular/core';
import { Map, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

import { TramoService } from 'src/app/core/services/tramo/tramo.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private http: HttpClient, private tramoService: TramoService) { }
  groupGeoJson = new L.FeatureGroup();//cambiar a layer

  ngOnInit(): void {
    this.getDataFromApi();
  }

  getDataFromApi(): void {
    this.tramoService.getTramos()
      .subscribe((tramos: any) => {
        tramos.forEach((row: any) => {
          let data = JSON.parse(row.st_asgeojson);
          L.geoJSON(data, {
            style: {
              weight: 2,
              color: '#7b1fa2'
            }
          }).addTo(this.groupGeoJson);
        });
        this.showDataOnMap();

      });
  }

  showDataOnMap(): void {
    const map = new Map('map').setView([38.9951, -1.8559], 6.5);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    this.groupGeoJson.addTo(map);


  }

}
