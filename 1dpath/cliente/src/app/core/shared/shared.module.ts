import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MapComponent } from './componentes/map/map.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { MapNodosComponent } from './componentes/map-nodos/map-nodos.component';



@NgModule({
  declarations: [
    MapComponent,
    ToolbarComponent,
    MapNodosComponent,

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  exports: [
    MapComponent,
    MapNodosComponent,
    ToolbarComponent,
    RouterModule
  ]
})
export class SharedModule { }
