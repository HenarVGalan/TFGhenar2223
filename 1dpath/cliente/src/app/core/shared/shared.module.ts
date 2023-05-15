import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

import { MapComponent } from './componentes/map/map.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { MapNodosComponent } from './componentes/map-nodos/map-nodos.component';

import { MenuItems } from './menu-items';



@NgModule({
  declarations: [
    MapComponent,
    ToolbarComponent,
    MapNodosComponent,

  ],
  imports: [
    LeafletModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule
  ],
  exports: [
    LeafletModule,
    MapComponent,
    MapNodosComponent,
    ToolbarComponent,
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  providers: [
    MenuItems
  ]
})
export class SharedModule { }
