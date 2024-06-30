import { Sieve } from './../../app/models/sieve.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Chofer } from 'src/app/models/chofer.model';
import { Transporte } from 'src/app/models/transporte.model';
import { GuiaTransportista } from 'src/app/models/guiatransportista.model';
import { GuiaTransportistaModule } from 'src/app/guiatransportista/guiatransportista.module';
import { GuiaTransportistaPaginacion } from 'src/app/models/guiatransportista-vw-pagination.model';


var urlChoferPagination: string = environment.apiUrl.concat("vistas/PaginationListaChofer");
var urlTransportePagination: string = environment.apiUrl.concat("vistas/PaginationListaTransporte");
var urlGuiaTransportistaPagination: string = environment.apiUrl.concat("vistas/PaginationListaGuiaTransportista");


@Injectable({
  providedIn: 'root'
})


export class VistasPaginacionDataService {

  constructor(private http: HttpClient) { }


  GetChoferPagination(sieve: Sieve): Observable<Chofer[]>{
     return this.http.post<Chofer[]>(`${urlChoferPagination}`, sieve)
     .pipe(catchError(this.handleError));
  }


  GetTransportePagination(sieve: Sieve): Observable<Transporte[]>{
    return this.http.post<Transporte[]>(`${urlTransportePagination}`, sieve)
    .pipe(catchError(this.handleError));
 }

 GetGuiaTransportistaPagination(sieve: Sieve): Observable<GuiaTransportistaPaginacion[]>{
    return this.http.post<GuiaTransportistaPaginacion[]>(`${urlGuiaTransportistaPagination}`, sieve)
  .pipe(catchError(this.handleError));
}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Ocurrio un error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Servidor retorno: ${error.status}\nMessage: ${error.error.message}`;;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
