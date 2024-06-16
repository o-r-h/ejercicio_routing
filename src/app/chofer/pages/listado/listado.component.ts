import { Component ,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { HostListener } from '@angular/core';
import Swal from 'sweetalert2';

//modelos
import { Chofer } from 'src/app/models/chofer.model';
import { Sieve } from 'src/app/models/sieve.model';
import { TablaIndice } from './../../../models/tablaindice.model';
import { ChoferVistaPaginacion } from 'src/app/models/chofer-vw-paginacion.model';

//data services
import { ChoferDataService } from '../../../../data/chofer/chofer-data.service';
import { ListasDataService } from './../../../../data/listas/listas-data.services';
import { VistasPaginacionDataService } from '../../../../data/vistaspaginacion/vistas-paginacion.service';


//dialogos y utilidades
import { UtilsService } from 'src/app/helpers/utils.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ExcelExportService } from  '../../../../data/exports/excel-export.service' ;
import { EXCEL_EXPORTNAME} from  '../../../../data/constants/constants.module';

@Component({
  selector: 'chofer-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})


export class ListadoChoferComponent  implements OnInit{

  //table
  //displayedColumns: string[] = ['id', 'nombre', 'apellidopaterno', 'apellidomaterno', 'tipoDocumento', 'nroDocumento', 'brevete', 'actions'];
  //displayedColumns: string[] = ['id', 'nombre', 'apellidopaterno', 'apellidomaterno', 'descripcion', 'nroDocumento', 'brevete', 'actions'];
  displayedColumns: string[] = ['id', 'nombresyapellidos', 'descripcion', 'nroDocumento', 'brevete', 'actions'];



  //dataSource = new MatTableDataSource<Chofer>();
  dataSource = new MatTableDataSource<ChoferVistaPaginacion>();

  choferes: Chofer[] = [];
  choferesExport:Chofer[] = [];

  totalItems: number = 0;

  //dropdowns
  tipodocumentoList: TablaIndice[]=[];


  sieve: Sieve = {
    filters: '',
    pageSize: 5,
    page: 1,
    sorts: ''
  };

  sieveTotal: Sieve = {
    filters: '',
    pageSize: null,
    page: null,
    sorts: ''
  };


  filterValues = {
    nombre:  '',
    apellidoPaterno: ''
  };


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F2'){
      this.filterForm.reset();
      // Call Function
    }
  }

  //paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  filterForm: FormGroup;



  constructor(
    private utilsServices: UtilsService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private choferDataService: ChoferDataService,
    private listasDataService: ListasDataService,
    private vistasPaginacionDataService: VistasPaginacionDataService,
    private excelExportService: ExcelExportService
    ) {


    this.filterForm = this.fb.group({
      nombre: [''],
      apellidoPaterno: [''],
      tipoDocumento: [''],
      numeroDocumento: ['']
    });


  }

  ngOnInit(): void {
    this.cargarListas();
  }

  cargarListas(): void{
    this.listasDataService.getChoferTipoDocumento().subscribe(
      data=>{this.tipodocumentoList = data},
      error=>{console.error("error llenar lista",error);}
    )

  }



  onChangePage(event:any){
    //  this.filterProperties.emit(event)


      this.sieve.page = event["pageIndex"] ;
      this.loadData();
    }


  applyFilter(): void {

    this.sieve.filters = "nombre@=*" + this.filterForm.controls["nombre"].value   +
                         ",apellidoPaterno@=*" +this.filterForm.controls["apellidoPaterno"].value+
                         ",descripcion@=*" +this.filterForm.controls["tipoDocumento"].value+
                         (this.filterForm.controls["numeroDocumento"].value !=''?   ",numeroDocumento==" +this.filterForm.controls["numeroDocumento"].value :"");

    console.log(this.sieve.filters);
    this.resetTable();
    this.sieve.page = null; // Reset to first page on filter
    this.sieve.pageSize=null;
    this.getTotalRegistrosChoferes() //obtener la cantidad de registros
    this.loadData();
  }

  resetTable(): void {
    this.dataSource.data = []; // Clear table data
    this.paginator.firstPage(); // Reset paginator to first page
  }

  loadData(): void {
    this.sieve.pageSize = this.paginator.pageSize;
    this.sieve.page = this.paginator.pageIndex + 1;
    this.getFilteredChoferes();
  }

  getTotalRegistrosChoferes(): void {
    this.sieveTotal = this.sieve;
    this.sieveTotal.page = null;
    this.sieveTotal.pageSize = null;

    this.vistasPaginacionDataService.GetChoferPagination (this.sieveTotal).subscribe(
      (data: Chofer[]) => {
        this.totalItems = data.length;
        this.choferesExport = data;

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getFilteredChoferes(): void {

    this.vistasPaginacionDataService.GetChoferPagination(this.sieve).subscribe(
      (data: Chofer[]) => {
        this.choferes = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  exportDataToExcel(): void {
    const currentDate = new Date();
    let fechaReporte   = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
    this.excelExportService.exportToExcel(this.choferesExport, EXCEL_EXPORTNAME.replace("{1}","Chofer").replace("{2}",fechaReporte) );
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

       this.choferDataService.delete(element.id).subscribe(
            ()=>{
              this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
              Swal.fire(
                '¡Eliminado!',
                'El registro ha sido eliminado.',
                'success'
              );
              this.applyFilter();

            },
            error =>{ console.error("Error eliminar registro", error);

            }

       );


      }
    });

  }
  //navegacion
  navigateToAgregar() {
    this.router.navigate(['/chofer/agregar']);
  }

  editElement(element: ChoferVistaPaginacion): void {

     console.log("element", element)
    // Lógica para editar el elemento
    this.router.navigate(['chofer/agregar', element.id]);
  }

}
