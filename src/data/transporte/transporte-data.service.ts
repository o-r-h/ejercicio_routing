import { Sieve } from './../../app/models/sieve.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Transporte } from 'src/app/models/transporte.model';





var urlGet: string = environment.apiUrl.concat("transporte");
var urlGetAll: string = environment.apiUrl.concat("transporte/getall");
var urlCreate: string = environment.apiUrl.concat("transporte/create");
var urlDelete: string = environment.apiUrl.concat("transporte/delete");
var urlUpdate: string = environment.apiUrl.concat("transporte/update");
var urlPagination: string = environment.apiUrl.concat("transporte/pagination");


@Injectable({
  providedIn: 'root'
})


export class TransporteDataService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(urlGetAll)
      .pipe(catchError(this.handleError));
  }

  get(id: number): Observable<Transporte> {
    return this.http.get<Transporte>(`${urlGet}/${id}`)
      .pipe(catchError(this.handleError));
  }

  insert(transporte: Transporte): Observable<Transporte> {
    return this.http.post<Transporte>(urlCreate, transporte)
      .pipe(catchError(this.handleError));
  }

  update(id:number,transporte: Transporte): Observable<Transporte> {
    return this.http.put<Transporte>(`${urlUpdate}/${id}`, transporte)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${urlDelete}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getFilteredData(sieve: Sieve): Observable<Transporte[]>{
     return this.http.post<Transporte[]>(`${urlPagination}`, sieve)
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
