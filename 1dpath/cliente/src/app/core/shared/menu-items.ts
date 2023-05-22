import { Injectable } from '@angular/core';

export interface Menu {
  path: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { path: 'mapaNodos', name: 'Básico', type: 'link', icon: 'home' },
  { path: 'intermedio', name: 'Intermedio', type: 'link', icon: 'minimize' },
  { path: 'misrutas', name: 'Mis rutas', type: 'link', icon: 'map' },
  { path: 'crearRuta', name: 'Crear Ruta', type: 'link', icon: 'route' },
  { path: 'MapaLineas', name: 'Mapa Vías', type: 'link', icon: 'alt_route' },
  { path: 'mapaNodos', name: 'Mapa Nodos', type: 'link', icon: 'location_ont' },
  // { state: 'MapaLineas', name: 'Ejemplo', type: 'link', icon: 'show_chart' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
