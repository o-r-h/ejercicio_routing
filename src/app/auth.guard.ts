import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token de autenticación

     if (!isAuthenticated) {
       this.router.navigate(['/login']);
      return false;
     }
    console.log("2222222");
     return true;
  }
}
