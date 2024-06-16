import { Sieve } from './../../app/models/sieve.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Chofer } from 'src/app/models/chofer.model';





var urlGet: string = environment.apiUrl.concat("chofer");
var urlGetAll: string = environment.apiUrl.concat("chofer/getall");
var urlCreate: string = environment.apiUrl.concat("chofer/create");
var urlDelete: string = environment.apiUrl.concat("chofer/delete");
var urlUpdate: string = environment.apiUrl.concat("chofer/update");
var urlPagination: string = environment.apiUrl.concat("chofer/pagination");


@Injectable({
  providedIn: 'root'
})


export class ChoferDataService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Chofer[]> {
    return this.http.get<Chofer[]>(urlGetAll)
      .pipe(catchError(this.handleError));
  }

  get(id: number): Observable<Chofer> {
    return this.http.get<Chofer>(`${urlGet}/${id}`)
      .pipe(catchError(this.handleError));
  }

  insert(chofer: Chofer): Observable<Chofer> {
    return this.http.post<Chofer>(urlCreate, chofer)
      .pipe(catchError(this.handleError));
  }

  update(id:number,chofer: Chofer): Observable<Chofer> {
    return this.http.put<Chofer>(`${urlUpdate}/${id}`, chofer)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${urlDelete}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getFilteredData(sieve: Sieve): Observable<Chofer[]>{
     return this.http.post<Chofer[]>(`${urlPagination}`, sieve)
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
