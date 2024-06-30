import { TablaIndice } from './../../app/models/tablaindice.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { Observable, catchError, throwError } from 'rxjs';

var urlGetChoferTipoDocumento: string = environment.apiUrl.concat("tablaindice/GetChoferTipoDocumento");
var urlGetGuiaTransportistaEstado: string = environment.apiUrl.concat("tablaindice/GetGuiaTransportistaEstado");


@Injectable({
  providedIn: 'root'
})


export class ListasDataService {

  constructor(private http: HttpClient) { }


  getChoferTipoDocumento(): Observable<TablaIndice[]> {
    return this.http.get<TablaIndice[]>(urlGetChoferTipoDocumento)
      .pipe(catchError(this.handleError));
  }

  getGuiaTransportistaEstado(): Observable<TablaIndice[]> {
    return this.http.get<TablaIndice[]>(urlGetGuiaTransportistaEstado)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Ocurrio un error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Servidor retorno: ${error.status}, mensaje de error es: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
