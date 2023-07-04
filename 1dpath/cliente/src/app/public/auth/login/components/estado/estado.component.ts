import { Component, OnInit, ViewChild } from '@angular/core';
import { Map, tileLayer } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

L.Icon.Default.imagePath = 'assets/';
const iconAlert = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#fce514",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})

export class EstadoComponent implements OnInit {

  imageUrl: string = "/1dpath/cliente/src/assets/mapaaemet.png";
  private mapa: any;
  //alertasGeoJson = new L.LayerGroup();
  alertasGeoJson = {
    type: 'Feature' as const,
    properties: {
      name: 'alerta1',
      amenity: 'Baseball Stadium',
      popupContent: 'alerta 1'
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [-3.7479618758496542, 40.42357811263793]

    },

  };
  alertas2GeoJson = {
    type: 'Feature' as const,
    properties: {
      name: 'alerta1',
      amenity: 'Baseball Stadium',
      popupContent: 'alerta 1'
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [-5.75456840593796, 41.522957298833546]

    },

  };
  alerta3sGeoJson = {
    type: 'Feature' as const,
    properties: {
      name: 'alerta1',
      amenity: 'Baseball Stadium',
      popupContent: 'alerta 1'
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [-6.447898144239559, 39.47149720511018]

    },

  };

  constructor() { }

  ngOnInit() {
      this.initMap();
  }
 

  private initMap(): void {

    this.mapa = new Map('mapa-alertas',
      {
        center: [39.916, -4.187],
        zoom: 4.5,
        minZoom: 0,

      }
    );

    const tiles = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.mapa);
    // var marker = new L.Marker([-3.7479618758496542, 40.42357811263793]);
    // this.alertasGeoJson.addTo(this.mapa);

    L.geoJSON(this.alertasGeoJson, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    }).addTo(this.mapa);
    L.geoJSON(this.alertas2GeoJson, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    }).addTo(this.mapa);
    L.geoJSON(this.alerta3sGeoJson, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    }).addTo(this.mapa);
  }
  // 
  //
}



