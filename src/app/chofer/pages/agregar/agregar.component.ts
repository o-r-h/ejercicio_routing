import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChoferDataService } from 'src/data/chofer/chofer-data.service';
import { Chofer } from 'src/app/models/chofer.model';

@Component({
  selector: 'chofer-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarChoferComponent {
  userForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private choferDataService: ChoferDataService
   ) {
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
    { value: 'dni', viewValue: 'DNI' },
    { value: 'passport', viewValue: 'Pasaporte' },
    { value: 'license', viewValue: 'Licencia' },
  ];


  ngOnInit(): void {
    // Inicialización si es necesario
  }


  // Submit Registration Form
  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      alert('Por favor llene todos los campos requeridos')
      return false;
    } else {
      console.log(this.userForm.value)
      return true;
    }
  }

  onBack() {
    // Lógica para el botón de regresar
    this.router.navigate(['chofer/listado']);
  }

// Método para manejar la creación o actualización
saveChofer(): void {
  if (this.userForm.valid) {
    const chofer: Chofer = this.userForm.value;
    if (chofer.id) {
      this.choferDataService.update(chofer).subscribe(
        response => {
          console.log('Chofer actualizado', response);
        },
        error => {
          console.error('Error actualizando chofer', error);
        }
      );
    } else {
      this.choferDataService.insert(chofer).subscribe(
        response => {
          console.log('Chofer agregado exitosamente', response);
        },
        error => {
          console.error('Error agregando chofer', error);
        }
      );
    }
  }
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
