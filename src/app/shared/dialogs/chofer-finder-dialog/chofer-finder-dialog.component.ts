import { CommonModule } from '@angular/common';
import { Component ,OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { Chofer } from 'src/app/models/chofer.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { UtilsService } from 'src/app/helpers/utils.service';
import { ChoferDataService } from '../../../../data/chofer/chofer-data.service';
import { Sieve } from 'src/app/models/sieve.model';




@Component({
  selector: 'app-chofer-finder-dialog',
  templateUrl: 'chofer-finder-dialog.component.html',
  styleUrls: ['./chofer-finder-dialog.component.css'],

})


export class ChoferFinderDialogComponent implements OnInit{

  //table
  displayedColumns: string[] = ['id', 'nombre', 'apellidopaterno', 'apellidomaterno', 'nroDocumento',  'actions'];
  dataSource = new MatTableDataSource<Chofer>();
  choferes: Chofer[] = [];
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

  //paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  filterForm: FormGroup;

  constructor(
    private utilsServices: UtilsService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ChoferFinderDialogComponent>,
    private choferDataService: ChoferDataService
    ){

      this.filterForm = this.fb.group({
        nombre: [''],
        apellidoPaterno: [''],
        apellidoMaterno: [''],
        numeroDocumento: [''],
      });


  }

  ngOnInit(): void {
    //this.getFilteredChoferes();
    // this.dataSource.paginator = this.paginator;
    // this.paginator.page.subscribe(() => this.loadData());
  }

  onChangePage(event:any){
  //  this.filterProperties.emit(event)
    console.log('event' , event["pageIndex"])

    this.sieve.page = event["pageIndex"] ;
    this.loadData();
  }

  applyFilter(): void {
    //this.filterValues = this.filterForm.value;
    this.sieve.filters = "nombre@=*" + this.filterForm.controls["nombre"].value   +
                         ",apellidoPaterno@=*" +this.filterForm.controls["apellidoPaterno"].value +
                         ",apellidoPaterno@=*" +this.filterForm.controls["apellidoPaterno"].value +
                         ",numeroDocumento@=*" +this.filterForm.controls["numeroDocumento"].value ;
    //this.dataSource.filter = JSON.stringify(this.sieve);
    //this.getFilteredChoferes();
    this.resetTable();
    this.sieve.page = null; // Reset to first page on filter
    this.sieve.pageSize=null;
    this.getTotalRegistrosChoferes()
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

    this.choferDataService.getFilteredData(this.sieveTotal).subscribe(
      (data: Chofer[]) => {
        this.totalItems = data.length;
        console.log(' getTotalRegistrosChoferes longitud choferes **:', this.totalItems);

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getFilteredChoferes(): void {

    this.choferDataService.getFilteredData(this.sieve).subscribe(
      (data: Chofer[]) => {
        this.choferes = data;
        //this.totalItems = data.length;
       // this.dataSource.data = this.choferes;
        console.log(' getFilteredChoferes longitud choferes:', this.totalItems);

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }


  // //importante para la paginacion
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator

  // }


  onNoClick(): void {
    this.dialogRef.close();
  }



}


