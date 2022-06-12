import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NumeracionesService {
  onProductsChanged: BehaviorSubject<any>;
  numeraciones: any[];
  pais:any[];
 
  API_URI = environment.ipKey;
  constructor(private http: HttpClient, private router: Router) { 
    this.onProductsChanged = new BehaviorSubject({});
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {
        let user=JSON.parse(localStorage.getItem('usuario'));
          Promise.all([

              this.getNumeracion('/numeracion/todo',user.company)
        
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }

  getNumeracion(url: string,company:number): Promise<any>
  {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({ccomp: company});
      return new Promise((resolve, reject) => {
          this.http.post(`${this.API_URI}`+url,body,{ headers: headers } )
              .subscribe((response: any) => {
                  this.numeraciones = response;
               
                  this.onProductsChanged.next(this.numeraciones);
                  resolve(response);
              }, reject);
      });
  }

  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }
  addNumeracion(numeracion): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.post(`${this.API_URI}`+'/numeracion', numeracion)
              .subscribe((response: any) => {
                  resolve(response);
              }, reject
         );
      });
  }

  saveNumeracion(numeracion:any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.API_URI}`+'/numeracion/', numeracion)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

  getNumeracionOne(url: string,id:number | string,) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({cnum: id});
    return this.http.post(`${this.API_URI}` + url, body,{ headers: headers })
    .pipe(retry(1),catchError(this.errorHandl));
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
