import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core/shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PublicComponent } from './public.component';
import { CrearRutaComponent } from './auth/login/containers/crear-ruta/crear-ruta.component';



@NgModule({
  declarations: [
    PublicComponent,
    CrearRutaComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    PublicRoutingModule   
  ]
  
})
export class PublicModule { }
