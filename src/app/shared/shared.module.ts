import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { Error404PageComponent } from './pages/Error404Page/Error404Page.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations:[
    NavbarComponent, Error404PageComponent, ConfirmDialogComponent

   ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    NavbarComponent ,
    Error404PageComponent,
    ConfirmDialogComponent

  ],

})
export class SharedModule { }
