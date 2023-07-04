import { Component, OnInit } from '@angular/core';
import { Map, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { TramoService } from 'src/app/core/services/tramo/tramo.service';
import { PuntoService } from 'src/app/core/services/punto/punto.service';
import * as Highcharts from 'highcharts';

var geojsonMarkerOptions = {
  radius: 5,
  fillColor: "#7b1fa2",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
var ranges = [
  [13.7, 25.6],
  [13.3, 21.8],
  [11.2, 19.9],
  [7.9, 17.3],
  [4.9, 20.6],
  [5.1, 16.8],
  [9.3, 21.1],
  [11.1, 20.5],
  [8.9, 18.4],
  [4.6, 23.2],
  [11.5, 26.0],
  [8.6, 23.4],
  [9.8, 22.2],
  [8.1, 18.2],
  [5.9, 20.2],
  [4.5, 20.2],
  [8.9, 19.8],
  [11.1, 22.1],
  [7.9, 26.7],
  [15.9, 28.6],
  [14.9, 27.5],
  [9.5, 26.0],
  [11.5, 22.4],
  [8.6, 21.1],
  [12.9, 21.7],
  [13.6, 20.9],
  [9.6, 23.9],
  [8.6, 22.7],
  [7.5, 25.7],
  [5.5, 24.3],
  [10.4, 21.2]

],
  averages = [
    [18.1],
    [17.1],
    [15.2],
    [12.7],
    [13.3],
    [10.6],
    [15.6],
    [16.1],
    [14.0],
    [15.3],
    [17.5],
    [17.5],
    [15.3],
    [13.9],
    [13.7],
    [13.8],
    [14.0],
    [15.8],
    [18.6],
    [21.5],
    [19.8],
    [17.6],
    [16.8],
    [15.6],
    [16.7],
    [16.3],
    [17.2],
    [16.0],
    [16.9],
    [16.1],
    [14.5]
  ];

@Component({
  selector: 'app-mapa-ferrocarril',
  templateUrl: './mapa-ferrocarril.component.html',
  styleUrls: ['./mapa-ferrocarril.component.scss']
})


export class MapaFerrocarrilComponent implements OnInit {

  ruta: string | undefined;
  ObrasgroupGeoJson = new L.LayerGroup();
  NormalgroupGeoJson = new L.LayerGroup();
  puntosgroup = new L.LayerGroup();


  constructor(private http: HttpClient, private tramoService: TramoService, private puntoService: PuntoService) { }

  ngOnInit(): void {
    this.getDataFromApi();
    this.makePuntoMarkers();
  }

  getDataFromApi(): void {
    this.tramoService.getTramosFerrocarril()
      .subscribe((data: any) => {
        console.log(data);
        data.forEach((row: any) => {
          let data = JSON.parse(row.st_asgeojson);
          // console.log(data);
          L.geoJSON(data, {
            style: {
              weight: 2,
              color: '#7b1fa2'
            }
          }).addTo(this.NormalgroupGeoJson);

        });
        // console.log(data);

      });
    this.tramoService.getTramosObras()
      .subscribe((data: any) => {
        console.log(data);
        data.forEach((row: any) => {
          let data = JSON.parse(row.st_asgeojson);
          // console.log(data);
          L.geoJSON(data, {
            style: {
              weight: 2,
              color: 'red'
            }
          }).addTo(this.ObrasgroupGeoJson);

        });
        // console.log(data);
        this.showDataOnMap(data);
      });

  }

  makePuntoMarkers(): void {
    this.puntoService.getpIniciopFinal()
      .subscribe(async (puntos: any) => {

        puntos.forEach((row: any) => {

          let x = JSON.parse(row.x);
          let y = JSON.parse(row.y);

          L.circleMarker([y, x], geojsonMarkerOptions)
            // .bindPopup('<figure  class="highcharts-figure"><div style="height: 280px; width: 250px;" id="chart-estadovia"></div></figure>')

            // .bindPopup("<figure class='highcharts-figure'><div id='chart-estadovia'></div></figure> ( " + x + " ,<br>" + y + " )")
            .bindPopup('( ' + x + ' , <br>' + y + ' )')
            .on("click", e => {
              // this.setMarker(e);
              // this.getMarkerX();
              Highcharts.chart('chart-estadovia', this.optionsChartTemp);

            })
            .on('popupopen', e => {

            })
            .on('popupclose', e => {

            })
            .addTo(this.puntosgroup);
        });
      });
  }
  showDataOnMap(_data: any): void {
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    });

    var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
    });
    var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
    });

    var map = L.map('mapa-ferrocarril', {
      center: [40.058, -3.947],
      zoom: 6.5,
      layers: [osm]
    });

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.ObrasgroupGeoJson.addTo(map);
    this.NormalgroupGeoJson.addTo(map);

    var baseMaps = {
      "OpenStreetMap": osm,
      "OpenStreetMap.HOT": osmHOT
    };
    //this.puntosgroup.addTo(map);
    var layerControl = L.control.layers(baseMaps).addTo(map);
    layerControl.addBaseLayer(openTopoMap, "OpenTopoMap");
    var estaciones = L.layerGroup([this.puntosgroup]);
    layerControl.addOverlay(estaciones, "Estaciones");
  }
  // markerX: any;
  // markerY: any;
  // setMarker(e: any) {   
  //   this.markerX = e.latlng.lng;
  //   this.markerY = e.latlng.lat;
  //   console.log(e.latlng.lat + ' '+this.markerX);
  // }
  // getMarkerX() {    
  //   return this.markerY;
  // }
  public optionsChartTemp: any = {
    chart: {
      backgroundColor: '#424242',
    },
    title: {
      style: { color: "#ffff" },
      text: 'Histórico reciente de temperatura',
      align: 'left'
    },

    subtitle: {
      // text: 'Estación '+ this.getMarkerX(),
      align: 'left'
    },

    xAxis: {
      labels: { style: { color: "#ffff" } },
      type: 'datetime',
      accessibility: {
        rangeDescription: 'Range: Jul 1st 2022 to Jul 31st 2023.'
      }
    },

    yAxis: {
      labels: { style: { color: "#ffff" } },
      title: {
        text: null
      }
    },

    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: '°C'
    },

    plotOptions: {
      series: {
        pointStart: Date.UTC(2022, 6, 1),
        pointIntervalUnit: 'day'
      }
    },
    legend: {
      itemStyle: { color: "#ffff" },

    },
    series: [{
      name: 'Temperature',
      data: averages,
      zIndex: 1,
      marker: {
        fillColor: 'white',
        lineWidth: 2,
        lineColor: 'blue'
      }
    }, {
      itemStyle: { "color": "#ffff" },
      name: 'Range',
      data: ranges,
      type: 'arearange',
      lineWidth: 0,
      linkedTo: ':previous',
      color: 'orange',
      fillOpacity: 0.3,
      zIndex: 0,
      marker: {
        enabled: false
      }
    }]

  };


}
