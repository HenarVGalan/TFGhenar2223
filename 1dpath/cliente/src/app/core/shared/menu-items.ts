import { Injectable } from '@angular/core';

export interface Menu {
  path: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { path: 'basico', name: 'Básico', type: 'link', icon: 'data_usage' },
  { path: 'intermedio', name: 'Intermedio', type: 'link', icon: 'map' },
  { path: 'avanzado', name: 'Avanzado', type: 'link', icon: 'route' },
 // { path: 'misrutas', name: 'Mis rutas', type: 'link', icon: 'flowsheet' },
//  { path: 'crearRuta', name: 'Crear Ruta', type: 'link', icon: 'route' },
 // { path: 'MapaLineas', name: 'Mapa Vías', type: 'link', icon: 'alt_route' },
  //{ state: 'MapaLineas', name: 'Ejemplo', type: 'link', icon: 'show_chart' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
