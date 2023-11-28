import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarLlantasComponent } from './pages/agregar/agregar.component';
import { ListadoLlantasComponent } from './pages/listado/listado.component';

import { LlantasRoutingModule } from './llantas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LlantasRoutingModule
  ],
  exports: [],
  declarations: [
       AgregarLlantasComponent,
       ListadoLlantasComponent
  ],

})
export class LlantasModule { }
