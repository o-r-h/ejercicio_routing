import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken'; // Clave para almacenar el token en localStorage

  constructor() {}

  login(username: string, password: string): boolean {
    // Aquí puedes agregar la lógica de autenticación, como verificar el usuario y la contraseña
    // Este es solo un ejemplo básico
    if (username === 'usuario' && password === '123') {
      const token = 'dummy-token'; // Genera un token real en una aplicación real
      localStorage.setItem(this.tokenKey, token);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token; // Devuelve true si el token existe, false si no
  }
}
