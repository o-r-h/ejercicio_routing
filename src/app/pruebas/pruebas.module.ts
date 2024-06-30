import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule} from '@angular/forms';


import { SharedModule } from '../shared/shared.module';

import { AgregarPruebasComponent } from './pages/agregar/agregar.component'; //IMPORTANTE PARA EL ROUTING
import { PruebasRoutingModule } from './pruebas-routing-module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialModule,
    PruebasRoutingModule
  ],
  exports: [],
  declarations: [
    AgregarPruebasComponent,

  ],

})
export class PruebasModule  { }
