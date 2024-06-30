import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarChoferComponent } from './pages/agregar/agregar.component';
import { ListadoChoferComponent } from './pages/listado/listado.component';



export const routes: Routes =[

{
  path: 'agregar',
  component: AgregarChoferComponent
},

{
  path: 'agregar/:id',
  component: AgregarChoferComponent
},
{
  path: 'listado',
  component: ListadoChoferComponent
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
export class ChoferRoutingModule { }
