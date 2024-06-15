import { Sieve } from './../../app/models/sieve.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Chofer } from 'src/app/models/chofer.model';


var urlChoferPagination: string = environment.apiUrl.concat("vistas/PaginationListaChofer");


@Injectable({
  providedIn: 'root'
})


export class VistasPaginacionDataService {

  constructor(private http: HttpClient) { }


  GetChoferPagination(sieve: Sieve): Observable<Chofer[]>{
     return this.http.post<Chofer[]>(`${urlChoferPagination}`, sieve)
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
