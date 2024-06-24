import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms'; // Import this

import { NavbarComponent } from './navbar/navbar.component';
import { Error404PageComponent } from './pages/Error404Page/Error404Page.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ChoferFinderDialogComponent } from './dialogs/chofer-finder-dialog/chofer-finder-dialog.component';

@NgModule({
  declarations:[
    NavbarComponent,
    Error404PageComponent,
    ConfirmDialogComponent,
    ChoferFinderDialogComponent,


   ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule],
  exports: [
    NavbarComponent ,
    Error404PageComponent,
    ConfirmDialogComponent,
    ChoferFinderDialogComponent

  ],

})
export class SharedModule { }
