import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { HostListener } from '@angular/core';
import Swal from 'sweetalert2';

//modelos
import { Sieve } from 'src/app/models/sieve.model';
import { GuiaTransportistaPaginacion } from 'src/app/models/guiatransportista-vw-pagination.model';

//data services
import { VistasPaginacionDataService } from '../../../../data/vistaspaginacion/vistas-paginacion.service';
import { GuiaTransportistaDataService } from 'src/data/guiatransportista/guiatransportista-data.service';

//dialogos y utilidades
import { UtilsService } from 'src/app/helpers/utils.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ExcelExportService } from  '../../../../data/exports/excel-export.service' ;
import { EXCEL_EXPORTNAME} from  '../../../../data/constants/constants.module';
import { GuiaTransportista } from 'src/app/models/guiatransportista.model';




@Component({
  selector: 'guiatransportista-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],

})


export class ListadoGuiaTransportistaComponent implements OnInit{

  //para autofocus, click etc
  @ViewChild('serieInput') serieInput!: ElementRef ;



  //displayedColumns: string[] = ['id', 'serie' ,'numero', 'razonSocialCliente' ,'razonSocialConcesionario' , 'fechaTraslado' , 'ubigeoOrigen', 'ubigeoDestino'  ,'actions'];
  displayedColumns: string[] = ['id', 'serie' ,'numero', 'razonSocialCliente' , 'fechaTraslado' , 'ubigeoOrigen'  ,'actions'];
  dataSource = new MatTableDataSource<GuiaTransportistaPaginacion>();

  guiat: GuiaTransportista[] = [];
  guiatvw : GuiaTransportistaPaginacion[]=[];
  guiatExport:GuiaTransportista[] = [];

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
    serie:  '',
    numero: '',
    razonSocialcliente: '',
    razonSocialConcesionario: '',
    fechaTraslado:'',
    ubigeoOrigen:'',
    ubigeoDestino:'',

  };


 @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F2'){
      this.filterFormGt.reset();
      this.filterFormGt.get('serie')?.patchValue('');
      this.filterFormGt.get('numero')?.patchValue('');
      this.filterFormGt.get('razonSocialCliente')?.patchValue('');
      this.filterFormGt.get('razonSocialConcesionario')?.patchValue('');
      this.filterFormGt.get('fechaTraslado')?.patchValue('');
      this.filterFormGt.get('ubigeoOrigen')?.patchValue('');
      this.filterFormGt.get('ubigeoDestino')?.patchValue('');
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterFormGt: FormGroup;

  constructor(
    private utilsServices: UtilsService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private guiaTransportistaDataService: GuiaTransportistaDataService,
    private vistasPaginacionDataService : VistasPaginacionDataService,
    private excelExportService: ExcelExportService
    ) {


    this.filterFormGt = this.fb.group({
      serie: [''],
      numero: [''],
      razonSocialCliente: [''],
      razonSocialConcesionario: [''],
      fechaTraslado: [''],
      ubigeoOrigen: [''],
      ubigeoDestino: [''],
    });


  }

  ngOnInit(): void {


  }

  onChangePage(event:any){
      this.sieve.page = event["pageIndex"] ;
      this.loadData();
    }

    applyFilter(): void {

      this.sieve.filters =
                           (this.filterFormGt.controls["serie"].value !='' ? "Serie==" + this.filterFormGt.controls["serie"].value+"," :"")+
                           (this.filterFormGt.controls["numero"].value !=''?"Numero==" + this.filterFormGt.controls["numero"].value +",":"")+
                           (this.filterFormGt.controls["razonSocialCliente"].value != ''?",razonSocialCliente@=*" + this.filterFormGt.controls["razonSocialCliente"].value :''),

                           //  this.filterForm.controls["razonSocialConsecionario"].value != null?",RazonSocialConsecionario@=*" + this.filterForm.controls["razonSocialConsecionario"].value :''
                          //  this.filterForm.controls["fechaTraslado"].value != null?",FechaTraslado@=*" + this.filterForm.controls["FechaTraslado"].value :''
                          //  this.filterForm.controls["ubigeoOrigen"].value != null?",UbigeoOrigen@=*" + this.filterForm.controls["UbigeoOrigen"].value :''
                          //  this.filterForm.controls["ubigeoDestino"].value != null?",UbigeoDestino@=*" + this.filterForm.controls["UbigeoDestino"].value :''


      console.log("FILTER:",this.filterFormGt.controls["serie"].value);
     // this.resetTable();
      this.sieve.page = null; // Reset to first page on filter
      this.sieve.pageSize=null;
      this.getTotalRegistrosGuiaTransporte(); //obtener la cantidad de registros
      this.loadData();

      //para eventos de autofocus
      // this.serieInput.nativeElement.focus();
      // this.serieInput.nativeElement.click();
      // this.serieInput.nativeElement.click();

    }


    resetTable(): void {
      this.dataSource.data = []; // Clear table data
      this.paginator.firstPage(); // Reset paginator to first page
    }

    loadData(): void {
      this.sieve.pageSize = this.paginator.pageSize;
      this.sieve.page = this.paginator.pageIndex + 1;
      this.getFilteredGuiaTransporte();
    }

    getTotalRegistrosGuiaTransporte(): void {
      this.sieveTotal = this.sieve;
      this.sieveTotal.page = null;
      this.sieveTotal.pageSize = null;
      console.log("todos-0", this.totalItems);
      this.vistasPaginacionDataService.GetGuiaTransportistaPagination(this.sieveTotal).subscribe(
        (data: GuiaTransportistaPaginacion[]) => {
          this.totalItems = data.length;
          this.guiatExport = data;
          console.log("todos-1", this.totalItems);
        },
        error => {
          console.error('Error fetching data:', error);
          console.log("todos-2e", this.totalItems);
        }
      );
    }


    getFilteredGuiaTransporte(): void {

      this.vistasPaginacionDataService.GetGuiaTransportistaPagination(this.sieve).subscribe(
        (data: GuiaTransportistaPaginacion[]) => {
          this.guiatvw = data;
          console.log("guiatvw", this.guiatvw);
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
    }


  exportDataToExcel(): void {
    const currentDate = new Date();
    let fechaReporte   = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
    this.excelExportService.exportToExcel(this.guiatExport, EXCEL_EXPORTNAME.replace("{1}","GuiaTransportistaPaginacion").replace("{2}",fechaReporte) );
  }

  deleteElement(element: GuiaTransportista): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `¿Está seguro de que desea eliminar el registro de serie:${element.serie} -  Numero:${element.numero}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se confirma la eliminación, se elimina el elemento

       this.guiaTransportistaDataService.delete(element.id).subscribe(
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
    this.router.navigate(['/guiatransportista/agregar']);
  }

  editElement(element: GuiaTransportistaPaginacion): void {

     console.log("element", element)
    // Lógica para editar el elemento
    this.router.navigate(['guiatransportista/agregar', element.id]);
  }

}






