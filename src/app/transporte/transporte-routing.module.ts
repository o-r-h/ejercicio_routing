import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarTransporteComponent } from './pages/agregar/agregar.component';
import { ListadoTransporteComponent } from './pages/listado/listado.component';



export const routes: Routes =[

{
  path: 'agregar',
  component: AgregarTransporteComponent
},

{
  path: 'agregar/:id',
  component: AgregarTransporteComponent
},
{
  path: 'listado',
  component: ListadoTransporteComponent
},
{ path: '',
  redirectTo: '/listado', pathMatch: 'full' } // Ruta por defecto
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class TransporteRoutingModule { }
