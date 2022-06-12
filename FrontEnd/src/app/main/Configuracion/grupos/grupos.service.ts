import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GruposService {
  onProductsChanged: BehaviorSubject<any>;
  grupos: any[];
 
  API_URI = environment.ipKey;

  constructor(private http: HttpClient, private router: Router) { 
    this.onProductsChanged = new BehaviorSubject({});
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise((resolve, reject) => {

          Promise.all([
              this.getProducts('/grupos')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }

  getProducts(url: string): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URI}`+url )
              .subscribe((response: any) => {
                  this.grupos = response;
                   this.onProductsChanged.next(this.grupos);
                  resolve(response);
              }, reject);
      });
  }

  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }
  addCompany(grupos): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.post(`${this.API_URI}`+'/grupos', grupos)
              .subscribe((response: any) => {
                  resolve(response);
              }, reject
         );
      });
  }

  saveCompany(grupos:any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.API_URI}`+'/grupos', grupos)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

  getGruposOne(url: string,id:number | string,) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({grupoid: id});
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
