import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../core/shared/shared.module';
import { MaterialModule } from '../core/shared/material/material.module';

import { PublicRoutingModule } from './public-routing.module';

import { PublicComponent } from './public.component';
import { CrearRutaComponent } from './auth/login/containers/crear-ruta/crear-ruta.component';
import { BasicoComponent } from './auth/login/containers/basico/basico.component';
import { MapaNetwork01TipoComponent } from './auth/login/components/mapa-network01-tipo/mapa-network01-tipo.component';
import { IntermedioComponent } from './auth/login/containers/intermedio/intermedio.component';
import { EstadoComponent } from './auth/login/components/estado/estado.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PanelFerrocarrilComponent } from './auth/login/components/panel-ferrocarril/panel-ferrocarril.component';
import { AvanzadoComponent } from './auth/login/containers/avanzado/avanzado.component';
import { MapaFerrocarrilComponent } from './auth/login/components/mapa-ferrocarril/mapa-ferrocarril.component';
import { ChartObrasComponent } from './auth/login/components/chart-obras/chart-obras.component';


//import { MenuItems } from '../core/shared/menu-items';

@NgModule({
  declarations: [
    PublicComponent,
    CrearRutaComponent,
    BasicoComponent,
    MapaNetwork01TipoComponent,
    IntermedioComponent,
    EstadoComponent,
    PanelFerrocarrilComponent,
    AvanzadoComponent,
    MapaFerrocarrilComponent,
    ChartObrasComponent,   
    

  ],
  imports: [
    CommonModule,
    SharedModule,   
    ReactiveFormsModule,    
    PublicRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]

})
export class PublicModule { }
