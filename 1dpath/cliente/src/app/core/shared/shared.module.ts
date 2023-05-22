import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MapComponent } from './componentes/map/map.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { MapNodosComponent } from './componentes/map-nodos/map-nodos.component';

import { MenuItems } from './menu-items';
import { Punto } from '../models/Punto';
import { Tramo } from '../models/Tramo';



@NgModule({
  declarations: [
    MapComponent,
    ToolbarComponent,
    MapNodosComponent,

  ],
  imports: [
    LeafletModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    LeafletModule,
    MapComponent,
    MapNodosComponent,
    ToolbarComponent,    
    RouterModule
  ],
  providers: [
    MenuItems
  ]
})
export class SharedModule { }
