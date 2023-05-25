import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './componentes/map/map.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { MapNodosComponent } from './componentes/map-nodos/map-nodos.component';

import { MenuItems } from './menu-items';
import { Punto } from '../models/Punto';
import { Tramo } from '../models/Tramo';
import { SettingsComponent } from './componentes/settings/settings.component';



@NgModule({
  declarations: [
    MapComponent,
    ToolbarComponent,
    MapNodosComponent,
    SettingsComponent,

  ],
  imports: [
    LeafletModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    LeafletModule,
    MapComponent,
    MapNodosComponent,
    ToolbarComponent, 
    ReactiveFormsModule,  
    FormsModule, 
    RouterModule
  ],
  providers: [
    MenuItems
  ]
})
export class SharedModule { }
