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


//import { MenuItems } from '../core/shared/menu-items';

@NgModule({
  declarations: [
    PublicComponent,
    CrearRutaComponent,
    BasicoComponent,
    MapaNetwork01TipoComponent,
    IntermedioComponent,   

  ],
  imports: [
    CommonModule,
    SharedModule,   
    ReactiveFormsModule,    
    PublicRoutingModule,
    MaterialModule,
  ]

})
export class PublicModule { }
