import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pub } from '../models/pub';

@Injectable({
  providedIn: 'root'
})
export class PubService {

  constructor(private http: HttpClient) { }

  get(): Observable<Pub[]> {
    const list = this.http.get<Pub[]>(environment.urlPub).pipe(map(x => x.slice(0,99)));
    return list;
  }

  getbyID(id: number): Observable<Pub> {
    if (id === 0)
      return of();

    let url = (`${environment.urlPub}/${id}`);
    return this.http.get<Pub>(url)
      .pipe(
        tap(data => console.log('getPub: ' + JSON.stringify(data)))
      );
  }

  update(pub: Pub): Observable<Pub> {
    let url = (`${environment.urlPub}/${pub.id}`);
    return this.http.patch<Pub>(url, pub).pipe(
      catchError((err) => {
        throw err;
      }));
  }
  
  create(pub: Pub): Observable<Pub> {
    pub.id = 0;
    return this.http.post<Pub>(environment.urlPub, pub)
      .pipe(
        tap(data => console.log('createPub: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delete(pub: Pub): Observable<Pub> {
    pub.isDeleted = true;
    let url = (`${environment.urlPub}/${pub.id}`);
    return this.http.patch<Pub>(url, pub).pipe(
      catchError((err) => {
        throw err;
      }));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  // getError(): Observable<any> {
  //   let id = 675353;
  //   let url = (`${environment.urlPub}/${id}`);
  //   return this.http.get<Pub>(url)
  //     .pipe(
  //       tap(data => console.log('getPub: ' + JSON.stringify(data))),
  //       map(t => {
  //         if(t.id !== 0)
  //           throw new Error("Film ID is not valid");
  //       }),
  //       catchError(error => {          
  //         return throwError(() => error.message);
  //         //return of([]);
  //       })
  //     );
  // }

}
