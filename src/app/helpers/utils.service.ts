import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class UtilsService{

  constructor() { }

  generaCadenaAleatoria(n: number): string {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < n; i++){
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

}
