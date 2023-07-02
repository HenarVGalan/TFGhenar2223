import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HPie from 'highcharts/modules/variable-pie';

HPie(Highcharts);

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})
export class EstadoComponent {


  constructor() { }

  ngOnInit() {
    Highcharts.chart('chart-estadovia', this.options);

  }
  public options: any = {
    chart: {
      type: 'variablepie',
      backgroundColor:'#424242',
    },
    title: {
      text: '',
      align: 'left'
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        'Area (square km): <b>{point.y}</b><br/>' +
        'Population density (people per square km): <b>{point.z}</b><br/>'
    },
    series: [{
      minPointSize: 10,
      innerSize: '40%',
      zMin: 0,
      name: 'estado_vias',
      borderRadius: 5,
      data: [{
        name: 'Obras',
        y: 10,
        z: 70
      }, {
        name: 'En normalidad',
        y: 90,
        z: 50
      }],
      colors: [
        '#d65353',
        '#7b1fa2',
        '#2dd9db',
        '#1feeaf',
        '#0ff3a0',
        '#00e887',
        '#23e274'
      ]
    }]
  };

}




