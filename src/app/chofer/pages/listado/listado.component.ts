
import { Component ,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'


//modelos
import { Chofer } from 'src/app/models/chofer.model';
import { UtilsService } from 'src/app/helpers/utils.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';



const ELEMENT_CHOFER: Chofer[] = [];

@Component({
  selector: 'chofer-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})





export class ListadoChoferComponent  implements OnInit{


  //table
  displayedColumns: string[] = ['id', 'nombre', 'apellidopaterno', 'apellidomaterno', 'tipoDocumento', 'nroDocumento', 'brevete', 'actions'];
  dataSource = new MatTableDataSource<Chofer>(ELEMENT_CHOFER);

  filterValues = {
    nombre:  '',
    apellidoPaterno: ''
  };


  //paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //importante para la paginacion
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  filterForm: FormGroup;



  constructor(
    private utilsServices: UtilsService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
    ) {





    this.filterForm = this.fb.group({
      nombre: [''],
      apellidoPaterno: ['']
    });

    for (let index = 1; index < 30; index++) {
      const newChofer = {
        nombre: this.utilsServices.generaCadenaAleatoria(15),
        apellidoPaterno: this.utilsServices.generaCadenaAleatoria(14),
        apellidoMaterno: this.utilsServices.generaCadenaAleatoria(12),
        id: index,
        tipoDocumento: 2,
        numeroDocumento: this.utilsServices.generaCadenaAleatoria(10),
        brevete: this.utilsServices.generaCadenaAleatoria(10)
      };
      ELEMENT_CHOFER.push(newChofer);
    }
    this.dataSource.data = ELEMENT_CHOFER;

    // Configure filter predicate
    this.dataSource.filterPredicate = (data: Chofer, filter: string): boolean => {
      const filterValues = JSON.parse(filter);
      return (!filterValues.nombre || data.nombre.toLowerCase().includes(filterValues.nombre.toLowerCase())) &&
             (!filterValues.apellidoPaterno || data.apellidoPaterno.toLowerCase().includes(filterValues.apellidoPaterno.toLowerCase()));
    };
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  navigateToAgregar() {
    console.log(1);
    this.router.navigate(['/chofer/agregar']);
  }


  applyFilter(): void {
    this.filterValues = this.filterForm.value;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  editElement(element: Chofer): void {
    console.log('Edit', element);
    // Lógica para editar el elemento
  }

  deleteElement(element: Chofer): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `¿Está seguro de que desea eliminar el registro de ${element.nombre} ${element.apellidoPaterno}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se confirma la eliminación, se elimina el elemento
        console.log('Delete', element);
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
      }
    });

  }

}
