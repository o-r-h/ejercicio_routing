
import { Sieve } from './../../app/models/sieve.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { GuiaTransportista } from './../../app/models/guiatransportista.model';




var urlGet: string = environment.apiUrl.concat("guiatransportista");
var urlGetAll: string = environment.apiUrl.concat("guiatransportista/getall");
var urlCreate: string = environment.apiUrl.concat("guiatransportista/create");
var urlDelete: string = environment.apiUrl.concat("guiatransportista/delete");
var urlUpdate: string = environment.apiUrl.concat("guiatransportista/update");
var urlPagination: string = environment.apiUrl.concat("guiatransportista/pagination");


@Injectable({
  providedIn: 'root'
})


export class GuiaTransportistaDataService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<GuiaTransportista[]> {
    return this.http.get<GuiaTransportista[]>(urlGetAll)
      .pipe(catchError(this.handleError));
  }

  get(id: number): Observable<GuiaTransportista> {
    return this.http.get<GuiaTransportista>(`${urlGet}/${id}`)
      .pipe(catchError(this.handleError));
  }

  insert(guiatransportista: GuiaTransportista): Observable<GuiaTransportista> {
    return this.http.post<GuiaTransportista>(urlCreate, guiatransportista)
      .pipe(catchError(this.handleError));
  }

  update(id:number,guiatransportista: GuiaTransportista): Observable<GuiaTransportista> {
    return this.http.put<GuiaTransportista>(`${urlUpdate}/${id}`, guiatransportista)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${urlDelete}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getFilteredData(sieve: Sieve): Observable<GuiaTransportista[]>{
     return this.http.post<GuiaTransportista[]>(`${urlPagination}`, sieve)
     .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Ocurrio un error: ${error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Servidor retorno: ${error.status}\nMessage: ${error.error.message}`;;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
