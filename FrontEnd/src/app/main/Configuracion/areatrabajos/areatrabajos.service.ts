import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AreatrabajosService {
  onProductsChanged: BehaviorSubject<any>;
  products: any[];
  areatrabajos:any[];

  API_URI = environment.ipKey;

  constructor(private http: HttpClient, private router: Router) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise((resolve, reject) => {

          Promise.all([
              this.getProducts('/areatrabajo')
            
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
                  this.products = response;
                  this.onProductsChanged.next(this.products);
                  resolve(response);
              }, reject);
      });
  }

  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }


  getAreaT(url: string,id: number): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URI}`+url +id)
              .subscribe((response: any) => {
                  this.areatrabajos = response;
               
                  this.onProductsChanged.next(this.areatrabajos);
                  resolve(response);
              }, reject);
      });
  }

  getAreaTOne(url: string,id:number | string,) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({careat: id});
    return this.http.post(`${this.API_URI}` + url, body,{ headers: headers })
    .pipe(retry(1),catchError(this.errorHandl));
  }

  addAreaT(areatrabajos): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.post(`${this.API_URI}`+'/areatrabajo', areatrabajos)
              .subscribe((response: any) => {
                  resolve(response);
              }, reject
         );
      });
  }
  saveAreaT(areatrabajos:any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.API_URI}`+'/areatrabajo/', areatrabajos)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
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
