import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarAlmacenComponent } from './pages/agregar/agregar.component';
import { AsignarAlmacenComponent } from './pages/asignar/asignar.component';
import { ListadoAlmacenComponent } from './pages/listado/listado.component';


export const routes: Routes = [
  //Layout de autorizacion

{
  path: 'agregar',
  component: AgregarAlmacenComponent
},
{
  path: 'asignar',
  component: AsignarAlmacenComponent

},
{
  path: 'listado',
  component: ListadoAlmacenComponent
}
]

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})

export class AlmacenRoutingModule{ }
