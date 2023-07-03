import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HPie from 'highcharts/modules/variable-pie';
import * as HighMaps from 'highcharts/highmaps'
HPie(Highcharts);
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

  constructor() { }

  ngOnInit() {
    Highcharts.chart('chart-estadovia', this.optionsPIE);
    //  HighMaps.mapChart('chart-alert', this.optionsMap);
    this.initMap();

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

  // Create the chart
  // public optionsMap: any = {
  //   chart: {
  //     // map: ,
  //     margin: 0
  //   },

  //   title: {
  //     text: ''
  //   },

  //   subtitle: {
  //     text: ''
  //   },

  //   navigation: {
  //     buttonOptions: {
  //       align: 'left',
  //       theme: {
  //         stroke: '#e6e6e6'
  //       }
  //     }
  //   },

  //   mapNavigation: {
  //     enabled: true,
  //     buttonOptions: {
  //       alignTo: 'spacingBox'
  //     }
  //   },

  //   mapView: {
  //     center: [38.9951, -1.8559],
  //     zoom: 13
  //   },

  //   tooltip: {
  //     pointFormat: '{point.name}'
  //   },

  //   legend: {
  //     enabled: true,
  //     title: {
  //       text: 'Attractions in Oslo'
  //     },
  //     align: 'left',
  //     symbolWidth: 20,
  //     symbolHeight: 20,
  //     itemStyle: {
  //       textOutline: '1 1 1px rgba(255,255,255)'
  //     },
  //     backgroundColor: 'rgba(255,255,255,0.8)',
  //     float: true,
  //     borderColor: '#e6e6e6',
  //     borderWidth: 1,
  //     borderRadius: 2,
  //     itemMarginBottom: 5
  //   },

  //   plotOptions: {
  //     mappoint: {
  //       dataLabels: {
  //         enabled: false
  //       }
  //     }
  //   },

  //   series: [{
  //     type: 'tiledwebmap',
  //     name: 'Basemap Tiles',
  //     provider: {
  //       type: 'OpenStreetMap'
  //     },
  //     showInLegend: false
  //   }, {
  //     type: 'mappoint',
  //     name: 'Museums',
  //     marker: {
  //       symbol: 'url(https://cdn.jsdelivr.net/gh/highcharts/highcharts@67f46da560/samples/graphics/museum.svg)',
  //       width: 24,
  //       height: 24
  //     },
  //     data: [{
  //       name: 'Fram Museum',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.692997228, 59.901996392]
  //       }
  //     }, {
  //       name: 'Vigeland Museum',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.70013, 59.92285]
  //       }
  //     }, {
  //       name: 'Norwegian Museum of Cultural History',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.6849055937, 59.9041430501]
  //       }
  //     }, {
  //       name: 'The Viking Ship Museum (Vikingskipshuset)',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.684461, 59.904756]
  //       }
  //     }, {
  //       name: 'Museum of Cultural History',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.735472, 59.916806]
  //       }
  //     }, {
  //       name: 'The Astrup Fearnley Museum of Modern Art',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.720863, 59.907062]
  //       }
  //     }, {
  //       name: 'Munch Museum',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.755656, 59.906169]
  //       }
  //     }, {
  //       name: 'Natural History Museum at the University of Oslo',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.7717, 59.9198]
  //       }
  //     }]
  //   }, {
  //     type: 'mappoint',
  //     name: 'Parks',
  //     marker: {
  //       symbol: 'url(https://cdn.jsdelivr.net/gh/highcharts/highcharts@67f46da560/samples/graphics/tree.svg)',
  //       width: 24,
  //       height: 24
  //     },
  //     data: [{
  //       name: 'The Vigeland Park',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.705147, 59.924484]
  //       }
  //     }, {
  //       name: 'Frogner Park',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.703473, 59.926458]
  //       }
  //     }, {
  //       name: 'The University\'s Botanical Garden',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.7699, 59.9174]
  //       }
  //     }]
  //   }, {
  //     type: 'mappoint',
  //     name: 'Great buildings',
  //     marker: {
  //       symbol: 'url(https://cdn.jsdelivr.net/gh/highcharts/highcharts@67f46da560/samples/graphics/building.svg)',
  //       width: 24,
  //       height: 24
  //     },
  //     data: [{
  //       name: 'The Norwegian National Opera & Ballet',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.751825, 59.90766]
  //       }
  //     }, {
  //       name: 'Akershus Fortress',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.736011, 59.907667]
  //       }
  //     }, {
  //       name: 'Royal Palace in Oslo',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.7275, 59.916944]
  //       }
  //     }, {
  //       name: 'Oslo City Hall',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.733583, 59.911764]
  //       }
  //     }, {
  //       name: 'Akrobaten bru',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.759654, 59.909714]
  //       }
  //     }]
  //   }, {
  //     type: 'mappoint',
  //     name: 'Restaurants',
  //     marker: {
  //       symbol: 'url(https://cdn.jsdelivr.net/gh/highcharts/highcharts@67f46da560/samples/graphics/eat.svg)',
  //       width: 24,
  //       height: 24
  //     },
  //     data: [{
  //       name: 'Elias mat & sånt',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.738687049524728, 59.9163183916486]
  //       }
  //     }, {
  //       name: 'Østbanehallen renovated train station & food court',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [10.751095761430776, 59.91085233408226]
  //       }
  //     }]
  //   }]
  // };

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

  }
  // 
  //
}



