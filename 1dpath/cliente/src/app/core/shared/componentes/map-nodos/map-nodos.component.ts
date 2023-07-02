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
  puntogroupGeoJson = new L.MarkerClusterGroup({   
   maxClusterRadius:20
  });
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
        zoom: 6,
        minZoom:0,
        
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

    var geojson291 = {
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
    L.polyline(geojson291.coordinates[0].map(coordinate => [coordinate[1], coordinate[0]]), { color: 'blue' }).addTo(this.mapa);
  
    var geojson29 = {
      "type": "MultiLineString",
      "coordinates": [
        [

          [-1.668786371, 38.312056431], [-1.669048759, 38.310842808], [-1.668939119, 38.3099584], [-1.668191206, 38.308327769], [-1.667086822, 38.306179403], [-1.666875622, 38.305221743], [-1.66698871, 38.304042473], [-1.667419471, 38.303001993], [-1.668158274, 38.302001059], [-1.669307024, 38.301094893], [-1.673459012, 38.298546528], [-1.675986999, 38.29725036], [-1.67890428, 38.295291644], [-1.681305144, 38.293426176], [-1.682357713, 38.292131286], [-1.683523198, 38.289648082], [-1.685111037, 38.286565804], [-1.686210132, 38.283315812], [-1.686489393, 38.281777902], [-1.686374154, 38.280560002], [-1.685442863, 38.278314606], [-1.682592711, 38.272181535], [-1.681702492, 38.270837761], [-1.680597943, 38.269969202], [-1.678798225, 38.268984659], [-1.67750238, 38.268582536], [-1.67500016, 38.268518239], [-1.673956876, 38.268686684], [-1.666269623, 38.271492325], [-1.653833407, 38.274522397], [-1.651737479, 38.274732624], [-1.650434683, 38.274708623], [-1.646830327, 38.274270556], [-1.634056963, 38.272653502], [-1.63104739, 38.272816664], [-1.619546337, 38.274673443], [-1.613184388, 38.275580658], [-1.610053674, 38.276093309], [-1.607157192, 38.276311268], [-1.597403682, 38.276411276], [-1.563136204, 38.276690236], [-1.53899215, 38.278374456], [-1.53675143, 38.278373547], [-1.534906197, 38.27803509], [-1.533192872, 38.277391853], [-1.527242121, 38.27373056], [-1.525634195, 38.272971385], [-1.524120583, 38.27263693], [-1.520891073, 38.272361927], [-1.512825156, 38.271575007], [-1.509634089, 38.271660657], [-1.507533121, 38.272102547], [-1.505389527, 38.272949386], [-1.50247623, 38.274534333], [-1.495388409, 38.278417785], [-1.492498099, 38.279975744], [-1.488103477, 38.282397394], [-1.486536663, 38.282971956], [-1.484963081, 38.283321116], [-1.482806927, 38.283644693], [-1.481078929, 38.283721449], [-1.480267774, 38.283692914], [-1.480016689, 38.283671636], [-1.479402102, 38.283537503], [-1.478309341, 38.283307043], [-1.476222442, 38.28250493], [-1.473346087, 38.281187844], [-1.457482314, 38.273942075], [-1.447087324, 38.270362438], [-1.446057006, 38.269898207], [-1.445030547, 38.269253784], [-1.444490101, 38.268868127], [-1.443733042, 38.267920867], [-1.442853505, 38.266287087], [-1.440860757, 38.262728026], [-1.440405379, 38.262109176], [-1.438791237, 38.260627806], [-1.437669668, 38.259630597], [-1.436356982, 38.258486643], [-1.435874178, 38.25808369], [-1.434854164, 38.257150891], [-1.434326448, 38.256711286], [-1.43308087, 38.255640285], [-1.429537972, 38.252988523], [-1.426183569, 38.250086855], [-1.423329097, 38.24785868], [-1.420018827, 38.245579239], [-1.417903508, 38.244586478], [-1.414938873, 38.244294133], [-1.405754433, 38.246260402], [-1.401697234, 38.246286307], [-1.398587611, 38.246352044], [-1.396209765, 38.245877991], [-1.394603476, 38.245135088], [-1.388600834, 38.239087061], [-1.386466226, 38.237444633], [-1.382182386, 38.23586267], [-1.376695047, 38.234462165], [-1.374113338, 38.234444443], [-1.363051609, 38.237084262], [-1.360392415, 38.236443351], [-1.360107879, 38.236394316], [-1.359857407, 38.236354769], [-1.359379306, 38.236275992], [-1.35815385, 38.235898384], [-1.353359698, 38.235191374], [-1.347669879, 38.23266923], [-1.343878076, 38.231606469], [-1.343072292, 38.231369802], [-1.339648204, 38.229717329], [-1.329656151, 38.226033945], [-1.326953318, 38.2243373], [-1.325112349, 38.223418886], [-1.325022645, 38.223345513], [-1.324707442, 38.223142757], [-1.322588879, 38.221382259], [-1.314508375, 38.215634211], [-1.297538362, 38.203241597], [-1.291879979, 38.199563748], [-1.286897352, 38.195823401], [-1.281793983, 38.190440964], [-1.277381954, 38.186276014], [-1.273912297, 38.184287549], [-1.268010073, 38.180893355], [-1.263976375, 38.179121569], [-1.261059496, 38.176960671], [-1.258034859, 38.174059151], [-1.256858608, 38.17072542], [-1.256176844, 38.164848732], [-1.254593481, 38.160887123], [-1.252218347, 38.159022432], [-1.2467644, 38.157526302], [-1.245300893, 38.156684383], [-1.244063697, 38.15544932], [-1.24343119, 38.154223291], [-1.243203399, 38.152778022], [-1.244480533, 38.147588397], [-1.244568682, 38.146292038], [-1.244256069, 38.14505277], [-1.240592388, 38.136536009], [-1.238872327, 38.133572432], [-1.234220069, 38.12872641], [-1.228881608, 38.120202122], [-1.22454738, 38.112648013], [-1.224220352, 38.107785779], [-1.2245945, 38.101284989], [-1.226638415, 38.096936167], [-1.23039852, 38.092811419], [-1.237844666, 38.086642142], [-1.237927048, 38.086535237], [-1.238984221, 38.085244382], [-1.240487857, 38.083401474], [-1.241404067, 38.082279708], [-1.244335656, 38.076501945], [-1.244372863, 38.076376336], [-1.244879714, 38.075680989], [-1.246539243, 38.067775402], [-1.247279558, 38.061117725], [-1.247463388, 38.056281134],
          
        ]
      ]
    }
    L.polyline(geojson29.coordinates[0].map(coordinate => [coordinate[1], coordinate[0]]), { color: 'blue' }).addTo(this.mapa);
    //-1,2474633879117516 21
  }

}