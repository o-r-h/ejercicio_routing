

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgregarGuiaTransportistaComponent } from './pages/agregar/agregar.component';
import { ListadoGuiaTransportistaComponent } from './pages/listado/listado.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { GuiaTransportistaRoutingModule } from './guiatransportista-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    GuiaTransportistaRoutingModule,
    MaterialModule

  ],
  exports: [],
  declarations: [
    AgregarGuiaTransportistaComponent,
    ListadoGuiaTransportistaComponent,

  ],

})
export class GuiaTransportistaModule { }
