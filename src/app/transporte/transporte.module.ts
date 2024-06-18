import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



import { AgregarTransporteComponent } from './pages/agregar/agregar.component';
import { ListadoTransporteComponent } from './pages/listado/listado.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { TransporteRoutingModule } from './transporte-routing.module';


@NgModule({
  imports: [

    CommonModule,
    SharedModule,
    TransporteRoutingModule,
    ReactiveFormsModule,
    MaterialModule


  ],
  exports: [],
  declarations: [
    AgregarTransporteComponent,
    ListadoTransporteComponent,

  ],

})
export class TransporteModule { }
