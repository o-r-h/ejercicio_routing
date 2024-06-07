import { Component } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { retry } from 'rxjs';

@Component({
  selector: 'chofer-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarChoferComponent
{
  userForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      tipoDocumento:['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.max(99999999999)]],
      brevete: ['', [Validators.required, Validators.max(99999999999)]],


    });
  }



  tiposDocumento = [
    { value: 'dni', viewValue: 'DNI' },
    { value: 'passport', viewValue: 'Pasaporte' },
    { value: 'license', viewValue: 'Licencia' },
  ];


  // Submit Registration Form
  onSubmit() {
    this.submitted = true;
    if(!this.userForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      console.log(this.userForm.value)
      return  true;
    }
  }

  onBack() {
    // Lógica para el botón de regresar
    this.router.navigate(['chofer/listado']);
  }
}
