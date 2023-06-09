import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Map, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { PuntoService } from 'src/app/core/services/punto/punto.service';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

L.Icon.Default.imagePath = 'assets/';
//
const purpleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
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
  styleUrls: ['./map-nodos.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class MapNodosComponent implements OnInit {

  // Variables referente al mapa leaflet
  private mapa: any;
  nodoinicio = {
    lat: null,
    long: null
  }
  nodofin = {
    lat: null,
    long: null
  }
  // puntoIniciogroupGeoJson = new L.LayerGroup();
  // puntoFingroupGeoJson = new L.LayerGroup();
  puntogroupGeoJson = new L.LayerGroup();
  //Variables referentes a control de inputs de las coordenadas
  puntoInicioFormGroup = this.formBuilder.group({
    //   latitudControl: [{value:'',disabled:true}, [Validators.required]],
    latitudControl: ['', Validators.required],
    longitudControl: ['', Validators.required],
  });
  puntoFinalFormGroup = this.formBuilder.group({
    latitudControl: ['', Validators.required],
    longitudControl: ['', Validators.required],
  });

  constructor(private puntoService: PuntoService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.initMap();
    this.makePuntoMarkers();
    // this.makePuntoInicioMarkers();
    // this.makePuntoFinMarkers();
  }
  //to do refactorizar 
  // makePuntoInicioMarkers(): void {

  //   this.puntoService.getpInicio()
  //     .subscribe((puntosInicio: any) => {

  //       puntosInicio.forEach((row: any) => {
  //         let lat = JSON.parse(row.lat);
  //         let long = JSON.parse(row.long);
  //         L.marker([lat, long], { icon: greenIcon })
  //           .bindPopup('Latitud: ' + lat + '<br> Longitud ' + long)
  //           .on("click", e => this.markerinicioOnClick(e.latlng))
  //           .addTo(this.puntoIniciogroupGeoJson);


  //       });
  //     });
  // }
  // makePuntoFinMarkers(): void {

  //   this.puntoService.getpFin()
  //     .subscribe((puntosFin: any) => {

  //       puntosFin.forEach((row: any) => {
  //         let lat = JSON.parse(row.lat);
  //         let long = JSON.parse(row.long);
  //         L.marker([lat, long])
  //           .bindPopup('Latitud: ' + lat + '<br> Longitud ' + long)
  //           .on("click", e => this.markerfinOnClick(e.latlng))
  //           .addTo(this.puntoFingroupGeoJson);

  //       });
  //     });
  // }
  //getpIniciopFinal
  makePuntoMarkers(): void {

    this.puntoService.getpIniciopFinal()
      .subscribe((puntos: any) => {

        puntos.forEach((row: any) => {

          let x = JSON.parse(row.x);
          let y = JSON.parse(row.y);

          L.marker([y, x], { icon: purpleIcon })
            .bindPopup('Latitud: ' + y + '<br> Longitud ' + x)
            .on("click", e => this.markerOnClick(e.latlng))
            .addTo(this.puntogroupGeoJson);


        });
      });
  }
  //to do refactorizar
  markerOnClick(latlng: any) {
    console.log('hola' + latlng);
    //controlar quien 
    this.nodoinicio.lat = latlng.lat;
    this.nodoinicio.long = latlng.lng;
    this.nodofin.lat = latlng.lat;
    this.nodofin.long = latlng.lng;
  }
  //to do refactorizar
  markerinicioOnClick(latlng: any) {
    this.nodoinicio.lat = latlng.lat;
    this.nodoinicio.long = latlng.lng;
  }
  markerfinOnClick(latlng: any) {
    this.nodofin.lat = latlng.lat;
    this.nodofin.long = latlng.lng;
  }


  private initMap(): void {

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
    this.puntogroupGeoJson.addTo(this.mapa);
    // this.puntoIniciogroupGeoJson.addTo(this.mapa);
    // this.puntoFingroupGeoJson.addTo(this.mapa);

  }

}