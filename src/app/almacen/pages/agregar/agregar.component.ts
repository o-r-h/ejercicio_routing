import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { ChoferFinderDialogComponent } from 'src/app/shared/dialogs/chofer-finder-dialog/chofer-finder-dialog.component';

@Component({
  selector: 'almacen-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarAlmacenComponent {

  mainForm: FormGroup;


  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.mainForm = this.fb.group({
      nombre: ['']
    });
  }


  openModal(): void {
    const dialogRef = this.dialog.open(ChoferFinderDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mainForm.patchValue({ nombre: result });
      }
    });
  }

}
