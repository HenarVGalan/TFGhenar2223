import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core/shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PublicComponent } from './public.component';
import { CrearRutaComponent } from './auth/login/containers/crear-ruta/crear-ruta.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
//import { MenuItems } from '../core/shared/menu-items';

@NgModule({
  declarations: [
    PublicComponent,
    CrearRutaComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    ReactiveFormsModule,
    MatButtonModule,
    PublicRoutingModule
  ]

})
export class PublicModule { }
