import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListapreciosService {
  onProductsChanged: BehaviorSubject<any>;
  products: any[];
  listaprecios:any[];
 
  API_URI = environment.ipKey;


  constructor(private http: HttpClient, private router: Router) { 
    this.onProductsChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([
              this.getProducts('/listaprecios')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }
  getOneProductsWithPrice(url: string, id: number | string, ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({lista: id});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
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

  getListaPrecio(url: string,id: number): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URI}`+url +id)
              .subscribe((response: any) => {
                  this.listaprecios = response;
               
                  this.onProductsChanged.next(this.listaprecios);
                  resolve(response);
              }, reject);
      });
  }

  getListaPrecioOne(url: string,id:number | string,) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({codlista: id});
    return this.http.post(`${this.API_URI}` + url, body,{ headers: headers })
    .pipe(retry(1),catchError(this.errorHandl));
  }
  
ActualizarPrecio(url: string,price:number, ItemCode:string, Pricelist:number, CurrCode:string,ccomp:number) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({price:price, ItemCode:ItemCode, Pricelist:Pricelist, CurrCode:CurrCode,ccomp:ccomp});
    return this.http.post(`${this.API_URI}` + url, body,{ headers: headers })
    .pipe(retry(1),catchError(this.errorHandl));
  }

  addListaPrecio(listaprecios): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.post(`${this.API_URI}`+'/listaprecios', listaprecios)
              .subscribe((response: any) => {
                  resolve(response);
              }, reject
         );
      });
  }
  saveListaPrecio(listaprecios:any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.API_URI}`+'/listaprecios/', listaprecios)
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

