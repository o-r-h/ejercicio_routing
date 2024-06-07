import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'almacen-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarAlmacenComponent {


  userForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    contactType: new FormControl(null, Validators.required),
    phone: new FormControl(),
    email: new FormControl(null, Validators.email),
  });

  contactType = [
    'Email',
    'Phone'
  ];

  get contactTypeValue () {
    return this.userForm.controls['contactType'].value
 }

 get isContactTypePhone (): boolean {
   return this.contactTypeValue === 'Phone';
 }

 get isContactTypeEmail (): boolean {
   return this.contactTypeValue === 'Email';
 }


 constructor () {
  this.userForm.statusChanges.subscribe(s => console.log('status', s));

  this.userForm.valueChanges.subscribe(v => console.log('value', v));
}

}
