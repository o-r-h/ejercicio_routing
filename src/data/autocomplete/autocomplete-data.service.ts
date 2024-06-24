
import { Sieve } from './../../app/models/sieve.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Autocomplete } from 'src/app/models/autocomplete.model';


var urlGetEntidad: string = environment.apiUrl.concat("autocomplete/AutocompleteEntidad");
var urlGetChofer: string = environment.apiUrl.concat("autocomplete/AutocompleteChofer");
var urlGetCarreta: string = environment.apiUrl.concat("autocomplete/AutocompleteCarreta");
var urlGetTractor: string = environment.apiUrl.concat("autocomplete/AutocompleteTractor");
var urlGetUbigeo: string = environment.apiUrl.concat("autocomplete/AutocompleteUbigeo");


@Injectable({
  providedIn: 'root'
})

export class AutocompleteDataService{

  constructor(private http: HttpClient) { }

  getAllEntidades(sieve:Sieve): Observable<Autocomplete[]> {
    console.log("sieve",sieve);
    return this.http.post<Autocomplete[]>(`${urlGetEntidad}`, sieve)
      .pipe(catchError(this.handleError));
  }

  getAllChoferes(sieve:Sieve): Observable<Autocomplete[]> {
    console.log("sieve",sieve);
    return this.http.post<Autocomplete[]>(`${urlGetChofer}`, sieve)
      .pipe(catchError(this.handleError));
  }

  getAllCarreta(sieve:Sieve): Observable<Autocomplete[]> {
    console.log("sieve",sieve);
    return this.http.post<Autocomplete[]>(`${urlGetCarreta}`, sieve)
      .pipe(catchError(this.handleError));
  }

  getAllTractor(sieve:Sieve): Observable<Autocomplete[]> {
    console.log("sieve",sieve);
    return this.http.post<Autocomplete[]>(`${urlGetTractor}`, sieve)
      .pipe(catchError(this.handleError));
  }

  getAllUbigeo(sieve:Sieve): Observable<Autocomplete[]> {
    console.log("sieve",sieve);
    return this.http.post<Autocomplete[]>(`${urlGetUbigeo}`, sieve)
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
