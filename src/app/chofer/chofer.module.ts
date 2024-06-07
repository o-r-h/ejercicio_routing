import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



import { AgregarChoferComponent } from './pages/agregar/agregar.component';
import { ListadoChoferComponent } from './pages/listado/listado.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

import { ChoferRoutingModule } from './chofer-routing.module';

@NgModule({
  imports: [

    CommonModule,
    SharedModule,
    ChoferRoutingModule,
    ReactiveFormsModule,
    MaterialModule


  ],
  exports: [],
  declarations: [
    AgregarChoferComponent,
    ListadoChoferComponent
  ],

})
export class ChoferModule { }
