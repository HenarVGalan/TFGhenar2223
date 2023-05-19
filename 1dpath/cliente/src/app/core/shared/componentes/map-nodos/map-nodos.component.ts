import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Map, tileLayer } from 'leaflet';
import * as L from 'leaflet';
L.Icon.Default.imagePath = 'assets/';

import { PuntoService } from 'src/app/core/services/punto/punto.service';



const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

@Component({
  selector: 'app-map-nodos',
  templateUrl: './map-nodos.component.html',
  styleUrls: ['./map-nodos.component.scss']
})
export class MapNodosComponent implements OnInit {
  private mapa: any;

  //public MarkerOptionsInicio;
  groupGeoJson = new L.FeatureGroup();
  myLayer: any;
  //private puntosInicio;

  //pIniciolayerGroup = new L.layerGroup;
  // L.Icon.Default.mergeOptions({
  //   iconRetinaUrl: 'assets/marker-icon-2x.png',
  //   iconUrl: 'assets/marker-icon.png',
  //   shadowUrl: 'assets/marker-shadow.png'
  // });

  constructor(private puntoService: PuntoService) {
    // this.MarkerOptionsInicio = {
    //   iconSize: 3,
    //   color: "blue",
    // };
  }


  ngOnInit(): void {
    this.initMap();
    this.makePuntoInicioMarkers();
    //this.getDataFromApi();
    // this.getPuntosInicioFin();
  }
  makePuntoInicioMarkers(): void {

    this.puntoService.getpIniciopFin()
      .subscribe((puntosInicio: any) => {
        // for (const c of res.features) {

        //   const lon = c.geometry.coordinates[0];
        //   const lat = c.geometry.coordinates[1];
        //   const marker = L.marker([lat, lon]);

        //   marker.addTo(this.mapa);
        // }
        puntosInicio.forEach((row: any) => {
          let data = JSON.parse(row.iniciotramo);
          console.log(data);
          // L.geoJSON(data);
          this.myLayer = L.geoJSON().addTo(this.mapa);
          this.myLayer.addData(data);
          //pIniciolayerGroup.addData();
        });
      });
  }


  // getPuntosInicioFin() {
  //   this.puntoService.getpIniciopFin()
  //     .subscribe((puntosInicio: any) => {
  //       this.puntosInicio = puntosInicio;
  //       this.puntosInicio.forEach((row: any) => {
  //         let data = JSON.parse(row.iniciotramo);
  //         console.log(data);
  //         L.geoJSON(data, {
  //           pointToLayer: function (feature, latlng) { return L.marker(latlng) }
  //         }).addTo(this.pIniciolayerGroup);
  //       });
  //       // console.log(data);
  //       //this.showDataOnMap(data);
  //        this.initPuntosInicioLayer();
  //       // this.showDataOnMap(this.puntosInicio);
  //     });
  //   //var cities = L.layerGroup([littleton, denver, aurora, golden]);
  // }

  // private initPuntosInicioLayer() {
  //   this.puntosInicio.forEach((row: any) => {
  //     let data = JSON.parse(row.iniciotramo);
  //     console.log(data);
  //     const puntosInicioLayer = L.geoJSON(data, {
  //       pointToLayer: function (feature, latlng) { return L.marker(latlng) }
  //     });
  //   });
  //  this.mapa.addLayer(puntosInicioLayer);
  // }

  // getDataFromApi(): void {
  //   const url = 'http://localhost:3000/api/punto/getGeoJsonInicioTramo';
  //   this.http.get(url).subscribe((data: any) => {
  //     data.forEach((row: any) => {
  //       let data = JSON.parse(row.iniciotramo);
  //       console.log(data);
  //       L.geoJSON(data, {
  //         pointToLayer: function (feature, latlng) { return L.marker(latlng) }
  //       }).addTo(this.groupGeoJson);

  //     });
  //     // console.log(data);
  //     //this.showDataOnMap(data);
  //   });
  //   //getGeoJsonFinTramo
  //   const url2 = 'http://localhost:3000/api/punto/getGeoJsonFinTramo';
  //   this.http.get(url2).subscribe((data: any) => {
  //     data.forEach((row: any) => {
  //       let data = JSON.parse(row.fintramo);
  //       console.log(data);
  //       L.geoJSON(data, {
  //         pointToLayer: function (feature, latlng) {
  //           var greenIcon = new L.Icon({
  //             iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  //             shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  //             iconSize: [25, 41],
  //             iconAnchor: [12, 41],
  //             popupAnchor: [1, -34],
  //             shadowSize: [41, 41]
  //           });

  //           return L.marker(latlng, { icon: greenIcon })
  //         }
  //       }).addTo(this.groupGeoJson);

  //     });
  //     // console.log(data);
  //     this.showDataOnMap(data);
  //   });
  // }

  private initMap(): void {
    //this.mapa = new Map('map-nodos').setView([38.9951, -1.8559], 7);
    this.mapa = new Map('map-nodos',
      {
        center: [38.9951, -1.8559],
        zoom: 7,
      }
    );
   
    const tiles = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.mapa);
    //const mylayer = L.layerGroup().addTo( this.mapa );
    // this.groupGeoJson.addTo(this.mapa);

  }
}