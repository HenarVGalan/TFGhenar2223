import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../core/shared/shared.module';
import { MaterialModule } from '../core/shared/material/material.module';

import { PublicRoutingModule } from './public-routing.module';

import { PublicComponent } from './public.component';
import { CrearRutaComponent } from './auth/login/containers/crear-ruta/crear-ruta.component';
import { BasicoComponent } from './auth/login/containers/basico/basico.component';

//import { MenuItems } from '../core/shared/menu-items';

@NgModule({
  declarations: [
    PublicComponent,
    CrearRutaComponent,
    BasicoComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,    
    PublicRoutingModule
  ]

})
export class PublicModule { }
