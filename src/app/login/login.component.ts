import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Simulación de autenticación
   // if (this.username === 'user' && this.password === 'password') {
      localStorage.setItem('token', 'fake-jwt-token');
     this.router.navigate(['/home']);
    //} else {
    //  alert('Credenciales incorrectas');
    //}
  }
}



// import { CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     CommonModule,
//   ],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class LoginComponent { }
