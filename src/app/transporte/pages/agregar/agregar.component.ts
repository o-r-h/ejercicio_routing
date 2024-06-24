import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { TransporteDataService } from 'src/data/transporte/transporte-data.service';
import { Transporte } from 'src/app/models/transporte.model';
import { TablaIndice } from './../../../models/tablaindice.model';


@Component({
  selector: 'transporte-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarTransporteComponent {
  userForm: FormGroup;
  submitted = false;
  isEditMode: boolean = false;
  itemId: number | null = null;

   //dropdowns
   tipodocumentoList: any[] =[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route :ActivatedRoute,
    private transporteDataService: TransporteDataService
   )


   {
    this.userForm = this.fb.group({
      placa: ['', Validators.required],
      registroMTC: ['', Validators.required],
      fichaInscripcion: ['', Validators.required],
      marca: ['', Validators.required],
      tipo: ['', Validators.required]

    });
  }





  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isEditMode = !!id;
      if (this.isEditMode) {
        this.itemId = +id!;
        this.getRecord(this.itemId);
      } else {
        this.itemId = null;
      }
    });

    this.cargarListas();
    this.tipodocumentoList =  [{ id:'CARRETA', descripcion: 'CARRETA' }, { id:'TRACTOR', descripcion: 'TRACTOR' } ];
  }


    cargarListas(): void{

     //this.tipolist = this.tiposDocumento;
    }



  // Submit Registration Form
  onSubmit() {

    if (!this.userForm.valid) {
      alert('Por favor llene todos los campos requeridos')
      return false;
    } else {
      console.log(this.userForm.value)
      this.saveRecord();
      return true;
    }
  }

  onBack() {
    // Lógica para el botón de regresar
    this.router.navigate(['transporte/listado']);
  }


saveRecord(): void {
    //if (this.userForm.valid) {

      const transporte: Transporte = this.userForm.value;

      if (this.isEditMode) {
        transporte.id = this.itemId !==null ? this.itemId:0;
         this.transporteDataService.update( (this.itemId !==null ? this.itemId:0) ,transporte).subscribe(
           response => {
             this.showUpdate();
           },
           error => {
            Swal.fire({
              icon: "error",
              title: "Error actualizando registro",
              text:  error,
              footer: '<a href="#">Contacte a soporte para mayor informacion</a>'
            });
           }
        );
      } else {

        this.transporteDataService.insert(transporte).subscribe(
          response => {
            this.showInsert();
          },
          error => {
            console.error('Error agregando registro', error);
            Swal.fire({
              icon: "error",
              title: "Error agregando registro",
              text:  error,
              footer: '<a href="#">Contacte a soporte para mayor informacion</a>'
            });

          }
        );
      }

  }

showUpdate() {
  Swal.fire({
    title: 'Informacion!',
    text: 'Se actualizo el registro',
    icon: 'success',
    confirmButtonText: 'OK'
  });
  this.onBack();
}

showInsert() {
  Swal.fire({
    title: 'Informacion!',
    text: 'Se agrego el registro',
    icon: 'success',
    confirmButtonText: 'OK'
  });
  this.onBack();
}


// Método para manejar la eliminación
deleteRecord(id: number): void {
  this.transporteDataService.delete(id).subscribe(
    response => {
      console.log('Registro eliminado exitosamente', response);
    },
    error => {
      console.error('Error eliminado registro', error);
    }
  );
}

// Método para obtener un chofer por ID
getRecord(id: number): void {
  this.transporteDataService.get(id).subscribe(
    response => {
      this.userForm.patchValue(response);
    },
    error => {
      console.error('Error obteniendo chofer', error);
    }
  );
}


}






