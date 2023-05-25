import { Component, OnInit } from '@angular/core';
import { Map, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { TramoService } from 'src/app/core/services/tramo/tramo.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
var limite1 = 48614.1863730758;
var limite2 = 50000.1863730758;


@Component({
  selector: 'app-mapa-network01-tipo',
  templateUrl: './mapa-network01-tipo.component.html',
  styleUrls: ['./mapa-network01-tipo.component.scss']
})
export class MapaNetwork01TipoComponent implements OnInit {

  constructor(private http: HttpClient, private tramoService: TramoService) { }
  groupGeoJson = new L.LayerGroup();

  public options: any = {
    chart: {

    }

  }
  ngOnInit(): void {
    this.getDataFromApi();
    //Highcharts.chart('container', this.options);
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
            color: 'black'
          }
        }).addTo(this.groupGeoJson);

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
            weight: 3,
            color: 'red'
          }
        }).addTo(this.groupGeoJson);

      });
      // console.log(data);
      this.showDataOnMap(data);
    });

  }
  showDataOnMap(_data: any): void {
    const map = new Map('mapa-tipos').setView([38.9951, -1.8559], 6.5);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.groupGeoJson.addTo(map);
  }




}
