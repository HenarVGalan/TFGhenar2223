import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'basico', name: 'Básico', type: 'link', icon: 'home' },
  { state: 'intermedio', name: 'Intermedio', type: 'link', icon: 'minimize' },
  { state: 'misrutas', name: 'Mis rutas', type: 'link', icon: 'map' },
  { state: 'crearruta', name: 'CrearRuta', type: 'link', icon: 'route' },
  { state: 'MapaLineas', name: 'Mapa Vías', type: 'link', icon: 'alt_route' },
  { state: 'MapaNodos', name: 'Mapa Nodos', type: 'link', icon: 'location_ont' },
  // { state: 'MapaLineas', name: 'Ejemplo', type: 'link', icon: 'show_chart' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
