import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { ChoferFinderDialogComponent } from 'src/app/shared/dialogs/chofer-finder-dialog/chofer-finder-dialog.component';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface ListaAutocomplete {
  id: number;
  nombre: string;
  campofull: string;
}

interface Item {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'pruebas-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})



export class AgregarPruebasComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredOptions: Observable<ListaAutocomplete[]> | undefined;

  options2: ListaAutocomplete[] = [
    {
      id: 1,
      nombre: 'Omar Jesus Rodriguez',
      campofull:
        ' Omar Jesus Rodriguez CE 004535554 MTC: 555587777  BRE: 00554774',
    },
    {
      id: 2,
      nombre: 'Daniel Jesus Rodriguez',
      campofull:
        ' Daniel Jesus Rodriguez CE 004535502 MTC: 55558888  BRE: 00554775',
    },
    {
      id: 3,
      nombre: 'Daniel Jesus Rodriguez',
      campofull:
        ' Daniel Jesus Rodriguez CE 004535507 MTC: 55559999  BRE: 00554776',
    },
    {
      id: 4,
      nombre: 'Daniel Jesus Rodriguez',
      campofull:
        ' Daniel Jesus Rodriguez CE 004535508 MTC: 55559900  BRE: 00554777',
    },
    {
      id: 5,
      nombre: 'Daniela Jesus Rodriguez',
      campofull:
        ' Daniela Jesus Rodriguez CE 004535509 MTC: 555589001  BRE: 00554778',
    },
  ];
  mainForm: FormGroup;



  items: Item[] = [];
  paginatedItems: Item[] = [];
  pageSize = 5;




  ngOnInit() {
    this.filteredOptions = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterStates(value))
    );

    for (let i = 1; i <= 50; i++) {
      this.items.push({ title: `Title ${i}`, subtitle: `Subtitle ${i}` });
    }
    this.updatePaginatedItems(0);

  }

  private _filterStates(value: string): ListaAutocomplete[] {
    const filterValue = value;
    return this.options2.filter((option) =>
      option.campofull.toLowerCase().includes(filterValue)
    );
  }

  displayFn(option: ListaAutocomplete): string {
    return option ? option.nombre : '';
  }


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

  optionSelected(option: ListaAutocomplete) {
    if (option) {
      // Aquí puedes realizar la lógica que necesites con el ID seleccionado
      console.log('ID seleccionado: ' + option.id);
    }
  }



  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    this.updatePaginatedItems(startIndex);
  }

  updatePaginatedItems(startIndex: number) {
    this.paginatedItems = this.items.slice(startIndex, startIndex + this.pageSize);
  }




}
