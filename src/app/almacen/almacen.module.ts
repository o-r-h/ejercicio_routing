import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AgregarAlmacenComponent } from './pages/agregar/agregar.component';
import { AsignarAlmacenComponent } from './pages/asignar/asignar.component';
import { ListadoAlmacenComponent } from './pages/listado/listado.component';
import { SharedModule } from '../shared/shared.module';

import { AlmacenRoutingModule } from './almacen-routing.module';  //IMPORTANTE PARA EL ROUTING

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AlmacenRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    AgregarAlmacenComponent,
    AsignarAlmacenComponent,
    ListadoAlmacenComponent,

  ],

})
export class AlmacenModule  { }
