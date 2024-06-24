import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPruebasComponent } from './pages/agregar/agregar.component';


export const routes: Routes = [
  //Layout de autorizacion

{
  path: 'agregar',
  component: AgregarPruebasComponent
},
]

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})

export class PruebasRoutingModule{ }
