import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarLlantasComponent } from './pages/agregar/agregar.component';
import { ListadoLlantasComponent } from './pages/listado/listado.component';


export const routes: Routes =[
{
  path: 'agregar',
  component: AgregarLlantasComponent
},
{
  path: 'listado',
  component: ListadoLlantasComponent
}

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class LlantasRoutingModule { }
