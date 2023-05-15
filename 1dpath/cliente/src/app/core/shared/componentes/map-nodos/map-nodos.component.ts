import { Component, OnInit } from '@angular/core';
import { Map, tileLayer } from 'leaflet';
import * as L from 'leaflet';
L.Icon.Default.imagePath = 'assets/';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-nodos',
  templateUrl: './map-nodos.component.html',
  styleUrls: ['./map-nodos.component.scss']
})
export class MapNodosComponent implements OnInit {

  public geojsonMarkerOptions;
  // L.Icon.Default.mergeOptions({
  //   iconRetinaUrl: 'assets/marker-icon-2x.png',
  //   iconUrl: 'assets/marker-icon.png',
  //   shadowUrl: 'assets/marker-shadow.png'
  // });
  constructor(private http: HttpClient) {
    this.geojsonMarkerOptions = {
      iconSize: 3,
      color: "blue",
    };
  };
  groupGeoJson = new L.FeatureGroup();


  ngOnInit(): void {
    this.getDataFromApi();
  }

  getDataFromApi(): void {
    const url = 'http://localhost:3000/api/punto/getGeoJsonInicioTramo';
    this.http.get(url).subscribe((data: any) => {
      data.forEach((row: any) => {
        let data = JSON.parse(row.iniciotramo);
        console.log(data);
        L.geoJSON(data, {
          pointToLayer: function (feature, latlng) { return L.marker(latlng) }
        }).addTo(this.groupGeoJson);

      });
      // console.log(data);
      //this.showDataOnMap(data);
    });
    //getGeoJsonFinTramo
    const url2 = 'http://localhost:3000/api/punto/getGeoJsonFinTramo';
    this.http.get(url2).subscribe((data: any) => {
      data.forEach((row: any) => {
        let data = JSON.parse(row.fintramo);
        console.log(data);
        L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            var greenIcon = new L.Icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            });          
           
            return L.marker(latlng,{icon: greenIcon})
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