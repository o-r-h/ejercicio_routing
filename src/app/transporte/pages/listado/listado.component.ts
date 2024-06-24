import { Component ,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { HostListener } from '@angular/core';
import Swal from 'sweetalert2';

//modelos
import { Transporte } from 'src/app/models/transporte.model';
import { Sieve } from 'src/app/models/sieve.model';
import { TransporteVistaPaginacion } from 'src/app/models/transporte-vw-paginacion.model';

//data services
import { TransporteDataService } from './../../../../data/transporte/transporte-data.service';
import { ListasDataService } from './../../../../data/listas/listas-data.services';
import { VistasPaginacionDataService } from '../../../../data/vistaspaginacion/vistas-paginacion.service';


//dialogos y utilidades
import { UtilsService } from 'src/app/helpers/utils.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ExcelExportService } from  '../../../../data/exports/excel-export.service' ;
import { EXCEL_EXPORTNAME} from  '../../../../data/constants/constants.module';





@Component({
  selector: 'app-listado',

  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],

})
export class ListadoTransporteComponent  implements OnInit{

  displayedColumns: string[] = ['id', 'placa', 'registroMTC', 'fichaInscripcion', 'marca', 'tipo', 'estatus', 'actions'];

  dataSource = new MatTableDataSource<TransporteVistaPaginacion>();

  transportes: Transporte[] = [];
  transportesExport: Transporte[] = [];
  tipolist: any[] =[];
  totalItems: number = 0;

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
    placa:  '',
    registroMTC: '',
    fichaInscripcion: '',
    marca:'',
    tipo: ''
  };

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F2'){

      this.filterForm.reset();
      this.filterForm.get('tipo')?.patchValue('');
      this.filterForm.get('fichaInscripcion')?.patchValue('');
      this.filterForm.get('registroMTC')?.patchValue('');
      this.filterForm.get('tipo')?.patchValue('');
      this.filterForm.get('marca')?.patchValue('');
      this.filterForm.get('placa')?.patchValue('');

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
    private transporteDataService: TransporteDataService,
    private listasDataService: ListasDataService,
    private vistasPaginacionDataService: VistasPaginacionDataService,
    private excelExportService: ExcelExportService
    ) {

      this.filterForm = this.fb.group({
        placa: [''],
        registroMTC: [''],
        fichaInscripcion: [''],
        marca:[''],
        tipo: ['']
      });
    }

    ngOnInit(): void {
        this.cargarListas();
      }

      cargarListas(): void{
        selectedtipo: '';
       this.tipolist = [{id:'TRACTOR',nombre:'TRACTOR'}, {id:'CARRETA',nombre:'CARRETA'}];
      }

      onChangePage(event:any){

          this.sieve.page = event["pageIndex"] ;
          this.loadData();
        }


        applyFilter(): void {

          this.sieve.filters = "placa@=*" + this.filterForm.controls["placa"].value   +
                               ",registroMTC@=*" +this.filterForm.controls["registroMTC"].value+
                               ",fichaInscripcion@=*" +this.filterForm.controls["fichaInscripcion"].value+
                               ",fichaInscripcion@=*" +this.filterForm.controls["fichaInscripcion"].value+
                               ",marca@=*" +this.filterForm.controls["marca"].value+
                               ",tipo@=*" +this.filterForm.controls["tipo"].value;

          console.log(this.sieve.filters);
          this.resetTable();
          this.sieve.page = null; // Reset to first page on filter
          this.sieve.pageSize=null;
          this.getTotalRegistros() //obtener la cantidad de registros
          this.loadData();
        }

        resetTable(): void {
          this.dataSource.data = []; // Clear table data
          this.paginator.firstPage(); // Reset paginator to first page
        }

        loadData(): void {
          this.sieve.pageSize = this.paginator.pageSize;
          this.sieve.page = this.paginator.pageIndex + 1;
          this.getFiltered();
        }

        getTotalRegistros(): void {
          this.sieveTotal = this.sieve;
          this.sieveTotal.page = null;
          this.sieveTotal.pageSize = null;

          this.vistasPaginacionDataService.GetTransportePagination (this.sieveTotal).subscribe(
            (data: Transporte[]) => {
              this.totalItems = data.length;
              this.transportesExport = data;

            },
            error => {
              console.error('Error fetching data:', error);
            }
          );
        }

        getFiltered(): void {

          this.vistasPaginacionDataService.GetTransportePagination(this.sieve).subscribe(
            (data: Transporte[]) => {
              this.transportes = data;
            },
            error => {
              console.error('Error fetching data:', error);
            }
          );
        }

        exportDataToExcel(): void {
          const currentDate = new Date();
          let fechaReporte   = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
          this.excelExportService.exportToExcel(this.transportesExport, EXCEL_EXPORTNAME.replace("{1}","Transporte").replace("{2}",fechaReporte) );
        }


        deleteElement(element: Transporte): void {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              message: `¿Está seguro de que desea eliminar el registro de ${element.placa} ${element.tipo}?`
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              // Si se confirma la eliminación, se elimina el elemento

             this.transporteDataService.delete(element.id).subscribe(
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

         navigateToAgregar() {
            this.router.navigate(['/transporte/agregar']);
        }

        editElement(element: TransporteVistaPaginacion): void {

          console.log("element", element)
         // Lógica para editar el elemento
         this.router.navigate(['transporte/agregar', element.id]);
       }

}

