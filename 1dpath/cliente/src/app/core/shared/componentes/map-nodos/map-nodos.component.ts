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

    var geojson = {
      "type": "MultiLineString",
      "coordinates": [
        [

          [-1.847254299, 39.000509586],
          [-1.846811021, 39.000072681],
          [-1.845617132, 38.998925495],
          [-1.84354761, 38.996949625],
          [-1.842205938, 38.995665775],
          [-1.840174192, 38.99209529],
          [-1.838063459, 38.988424862],
          [-1.836050987, 38.986521513],
          [-1.820723627, 38.976455529],
          [-1.817320786, 38.974213397],
          [-1.815699112, 38.973160686],
          [-1.790184132, 38.956417844],
          [-1.787068303, 38.954376047],
          [-1.781556347, 38.950750272],
          [-1.772690152, 38.944935381],
          [-1.77085793, 38.943456318],
          [-1.770459596, 38.943136738],
          [-1.766624087, 38.940077584],
          [-1.764454369, 38.937450462],
          [-1.760490787, 38.930515045],
          [-1.758920514, 38.925956832],
          [-1.758138102, 38.919226332],
          [-1.757511962, 38.916768684],
          [-1.757079286, 38.915124079],
          [-1.755442212, 38.912439381],
          [-1.740116385, 38.90382261],
          [-1.734981135, 38.901415185],
          [-1.733791655, 38.900861625],
          [-1.732087696, 38.900059168],
          [-1.730532212, 38.899339399],
          [-1.724942025, 38.89725999],
          [-1.717923946, 38.895732326],
          [-1.713719891, 38.895469796],
          [-1.709719909, 38.896038381],
          [-1.705961475, 38.897907085],
          [-1.7044671, 38.898917752],
          [-1.69970323, 38.902153759],
          [-1.698969462, 38.902551073],
        ]
      ]
    }
    // -1,8472542991664944
    //xinicio -1,6989694621686686 288
    // var coordinates = geojson.coordinates[0].map(coordinate => [coordinate[1], coordinate[0]]);
    L.polyline(geojson.coordinates[0].map(coordinate => [coordinate[1], coordinate[0]]), { color: 'blue' }).addTo(this.mapa);
  }

}