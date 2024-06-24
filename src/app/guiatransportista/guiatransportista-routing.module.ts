import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarGuiaTransportistaComponent } from './pages/agregar/agregar.component';
import { ListadoGuiaTransportistaComponent } from './pages/listado/listado.component';



export const routes: Routes =[

{
  path: 'agregar',
  component: AgregarGuiaTransportistaComponent
},

{
  path: 'agregar/:id',
  component: AgregarGuiaTransportistaComponent
},
{
  path: 'listado',
  component: ListadoGuiaTransportistaComponent
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
export class GuiaTransportistaRoutingModule { }
