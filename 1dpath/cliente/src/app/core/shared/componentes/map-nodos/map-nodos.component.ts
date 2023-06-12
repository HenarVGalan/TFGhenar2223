import { Component, OnInit, ViewChild } from '@angular/core';
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
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

import { HttpClient } from '@angular/common/http';
import { TramoService } from 'src/app/core/services/tramo/tramo.service';

@Component({
  selector: 'app-map-nodos',
  templateUrl: './map-nodos.component.html',
  styleUrls: ['./map-nodos.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true },

    },
  ],
})
export class MapNodosComponent implements OnInit {
  @ViewChild('stepper') stepper: any;
  // Variables referente al mapa leaflet
  private mapa: any;
  nodoinicio = {
    lat: '',
    long: ''
  }
  nodofin = {
    lat: '',
    long: ''
  }

  puntoIniciogroupGeoJson = new L.LayerGroup();
  puntoFingroupGeoJson = new L.LayerGroup();
  puntogroupGeoJson = new L.LayerGroup();
  tramosRutagroupGeoJson = new L.LayerGroup();
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

  constructor(private http: HttpClient, private tramoService: TramoService, private puntoService: PuntoService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.initMap();
    this.makePuntoMarkers();
  }

  //getpIniciopFinal
  makePuntoMarkers(): void {

    this.puntoService.getpIniciopFinal()
      .subscribe(async (puntos: any) => {

        puntos.forEach((row: any) => {

          let x = JSON.parse(row.x);
          let y = JSON.parse(row.y);

          L.marker([y, x], { icon: purpleIcon })
            .bindPopup('( ' + x + ' , <br>' + y + ' )')
            .on("click", e => {
              this.markerOnClick(e)
            })
            .on('popupopen', e => {
              if (this.stepper.selectedIndex == 0) {
                e.target.setIcon(greenIcon);
              }
              if (this.stepper.selectedIndex == 1) {
                e.target.setIcon(redIcon);
              }
            })
            .on('popupclose', e => {
              e.target.setIcon(purpleIcon);
            })
            .addTo(this.puntogroupGeoJson);


        });
      });
  }
  //to do refactorizar
  markerOnClick(e: any) {

    if (this.stepper.selectedIndex == 0) {

      this.puntoInicioFormGroup.setValue(
        {
          latitudControl: e.latlng.lat,
          longitudControl: e.latlng.lng
        }
      );
    }
    if (this.stepper.selectedIndex == 1) {

      this.puntoFinalFormGroup.setValue(
        {
          latitudControl: e.latlng.lat,
          longitudControl: e.latlng.lng
        }
      );
    }
    // console.log('hola' + this.puntoInicioFormGroup.value['latitudControl']);
    this.nodoinicio.lat = JSON.stringify(this.puntoInicioFormGroup.value['latitudControl']);
    this.nodoinicio.long = JSON.stringify(this.puntoInicioFormGroup.value['longitudControl']);
    this.nodofin.lat = JSON.stringify(this.puntoFinalFormGroup.value['latitudControl']);
    this.nodofin.long = JSON.stringify(this.puntoFinalFormGroup.value['longitudControl']);
  }

  public reset(): void {
    this.stepper.reset();
    this.puntoIniciogroupGeoJson.clearLayers();
    this.puntoFingroupGeoJson.clearLayers();
    this.puntogroupGeoJson.clearLayers();
    this.tramosRutagroupGeoJson.clearLayers();
    this.mapa.closePopup();
    this.makePuntoMarkers();

  }

  public update(): void {

    const px = JSON.parse(this.nodoinicio.long);
    const py = JSON.parse(this.nodoinicio.lat);
    this.puntoIniciogroupGeoJson.clearLayers();
    L.marker([py, px], { icon: greenIcon }).addTo(this.puntoIniciogroupGeoJson);
    this.puntoIniciogroupGeoJson.addTo(this.mapa);
    const pxf = JSON.parse(this.nodofin.long);
    const pyf = JSON.parse(this.nodofin.lat);
    this.puntoFingroupGeoJson.clearLayers();
    this.mapa.closePopup();
    L.marker([pyf, pxf], { icon: redIcon }).addTo(this.puntoFingroupGeoJson);
    this.puntoFingroupGeoJson.addTo(this.mapa);
  }
  public addInicio(): void {
    // if (this.stepper.selectedIndex == 2) {
    const px = JSON.parse(this.nodoinicio.long);
    const py = JSON.parse(this.nodoinicio.lat);
    this.puntoIniciogroupGeoJson.clearLayers();
    L.marker([py, px], { icon: greenIcon }).addTo(this.puntoIniciogroupGeoJson);
    this.puntoIniciogroupGeoJson.addTo(this.mapa);
    this.mapa.closePopup();

  }
  public addFinal(): void {
    const pxf = JSON.parse(this.nodofin.long);
    const pyf = JSON.parse(this.nodofin.lat);
    this.puntoFingroupGeoJson.clearLayers();
    L.marker([pyf, pxf], { icon: redIcon }).addTo(this.puntoFingroupGeoJson);
    this.puntoFingroupGeoJson.addTo(this.mapa);
    this.mapa.closePopup();
  }

  public calcularRuta(): void {
    //llamar servicio que llama a una api que le mandas lo que necesite
    this.mapa.closePopup();
    this.puntogroupGeoJson.clearLayers();
    this.getDataFromApi();
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
    //
    this.tramosRutagroupGeoJson.addTo(this.mapa);
  }
  getDataFromApi(): void {
    this.tramoService.getTramosRuta()
      .subscribe((tramos: any) => {
        tramos.forEach((row: any) => {
          let data = JSON.parse(row.st_asgeojson);
          L.geoJSON(data, {
            style: {
              weight: 2.5,
              color: 'red'
            }
          }).addTo(this.tramosRutagroupGeoJson);
        });


      });
  }

}