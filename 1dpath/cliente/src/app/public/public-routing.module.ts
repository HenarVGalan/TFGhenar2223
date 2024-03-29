import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { IntermedioComponent } from './auth/login/containers/intermedio/intermedio.component';
import { MapNodosComponent } from '../core/shared/componentes/map-nodos/map-nodos.component';
import { BasicoComponent } from './auth/login/containers/basico/basico.component';
import { AvanzadoComponent } from './auth/login/containers/avanzado/avanzado.component';


const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      {
        path: '',
        redirectTo: 'crearRuta',
        pathMatch: 'full'
      },
       {
        path: 'basico',
        component: BasicoComponent
      },
      {
        path: 'intermedio',
        component: IntermedioComponent
      },
      {
        path: 'avanzado',
        component: AvanzadoComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
