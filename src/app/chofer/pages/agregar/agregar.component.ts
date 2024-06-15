import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { ChoferDataService } from 'src/data/chofer/chofer-data.service';
import { ListasDataService } from './../../../../data/listas/listas-data.services';
import { Chofer } from 'src/app/models/chofer.model';
import { TablaIndice } from './../../../models/tablaindice.model';


@Component({
  selector: 'chofer-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarChoferComponent {
  userForm: FormGroup;
  submitted = false;
  isEditMode: boolean = false;
  itemId: number | null = null;

   //dropdowns
   tipodocumentoList: TablaIndice[]=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route :ActivatedRoute,
    private choferDataService: ChoferDataService,
    private listasDataService: ListasDataService
   )


   {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.max(99999999999)]],
      brevete: ['', [Validators.required, Validators.max(99999999999)]],


    });
  }


  tiposDocumento = [
    { value: '1', viewValue: 'DNI' },
    { value: '2', viewValue: 'Pasaporte' },
    { value: '3', viewValue: 'Licencia' },
  ];


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isEditMode = !!id;
      if (this.isEditMode) {
        this.itemId = +id!;
        this.getChofer(this.itemId);
      } else {
        this.itemId = null;
      }
    });

    this.cargarListas();
  }

  cargarListas(): void{
    this.listasDataService.getChoferTipoDocumento().subscribe(
      data=>{this.tipodocumentoList = data},
      error=>{console.error("error llenar lista",error);})
  }

  // Submit Registration Form
  onSubmit() {

    if (!this.userForm.valid) {
      alert('Por favor llene todos los campos requeridos')
      return false;
    } else {
      console.log(this.userForm.value)
      this.saveChofer();
      return true;
    }
  }

  onBack() {
    // Lógica para el botón de regresar
    this.router.navigate(['chofer/listado']);
  }

// Método para manejar la creación o actualización
saveChofer(): void {
  //if (this.userForm.valid) {

    const chofer: Chofer = this.userForm.value;

    if (this.isEditMode) {
      console.log(111111);
      chofer.id = this.itemId !==null ? this.itemId:0;
       this.choferDataService.update( (this.itemId !==null ? this.itemId:0) ,chofer).subscribe(
         response => {
           this.showUpdate();
         },
         error => {
           console.error('Error actualizando chofer', error);
         }
      );
    } else {
      console.log(22222);
      this.choferDataService.insert(chofer).subscribe(
        response => {
          this.showInsert();
        },
        error => {
          console.error('Error agregando chofer', error);
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
}

showInsert() {
  Swal.fire({
    title: 'Informacion!',
    text: 'Se agrego el registro',
    icon: 'success',
    confirmButtonText: 'OK'
  });
}



// Método para manejar la eliminación
deleteChofer(id: number): void {
  this.choferDataService.delete(id).subscribe(
    response => {
      console.log('Chofer eliminado exitosamente', response);
    },
    error => {
      console.error('Error eliminado chofer', error);
    }
  );
}

// Método para obtener un chofer por ID
getChofer(id: number): void {
  this.choferDataService.get(id).subscribe(
    response => {
      this.userForm.patchValue(response);
    },
    error => {
      console.error('Error obteniendo chofer', error);
    }
  );
}


}
