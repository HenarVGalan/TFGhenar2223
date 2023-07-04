import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HPie from 'highcharts/modules/variable-pie';
HPie(Highcharts);

@Component({
  selector: 'app-chart-obras',
  templateUrl: './chart-obras.component.html',
  styleUrls: ['./chart-obras.component.scss']
})
export class ChartObrasComponent {
  constructor() { }

  ngOnInit() {
    Highcharts.chart('basico-chart-estadovia', this.optionsPIE);
    
  }
  public optionsPIE: any = {
    chart: {
      type: 'variablepie',
      backgroundColor: '#424242',

    },
    title: {
      text: '',
      align: 'right'
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        'Distancia (km): <b>{point.y}%</b><br/>' +
        ''
    },
    legend: {
      itemStyle: { "color": "#ffff" },
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
    },
    plotOptions: {
      variablepie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
        dataLabels: {
          enabled: false,

        },
      }
    },
    series: [{
      minPointSize: 10,
      innerSize: '40%',
      zMin: 6,
      name: 'estado_vias',
      borderRadius: 5,
      data: [{
        name: 'Obras',
        y: 10,
        z: 70
      }, {
        name: 'En normalidad',
        y: 90,
        z: 30
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
