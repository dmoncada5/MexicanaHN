import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CitasService {
  onProductsChanged: BehaviorSubject<any>;
  products: any[];
  cita:any[];

  API_URI = environment.ipKey;

  constructor(private http: HttpClient, private router: Router) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([

               this.getProducts('/cita/','1')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }


  getProducts(url: string,valor:string): Promise<any>
  {
 
      return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URI}`+url+'V/'+valor )
              .subscribe((response: any) => {
                  this.products = response;
          
                  this.onProductsChanged.next(this.products);
                  resolve(response);
              }, reject);
      });
  }

  getCita(url: string,id: number): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URI}`+url +id)
              .subscribe((response: any) => {
                  this.cita = response;
               
                  this.onProductsChanged.next(this.cita);
                  resolve(response);
              }, reject);
      });
  }

  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }
  getExpOne(url: string,id:number | string) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({cexp: id});
    return this.http.post(`${this.API_URI}` + url, body,{ headers: headers })
    .pipe(retry(1),catchError(this.errorHandl));
  }

  getCitaOne(url: string,id:number | string,) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({ccita: id});
    return this.http.post(`${this.API_URI}` + url, body,{ headers: headers })
    .pipe(retry(1),catchError(this.errorHandl));
  }

  addCita(cita): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.post(`${this.API_URI}`+'/cita', cita)
              .subscribe((response: any) => {
                  resolve(response);
              }, reject
         );
      });
  }
  saveCita(cita:any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.API_URI}`+'/cita/', cita)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }  
    
    getInfo(url: string, id: number | string, pricelist: number) {
        let headers = new HttpHeaders();
        headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify({ItemCode: id, Pricelist: pricelist});
        return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
        .pipe(retry(1), catchError(this.errorHandl));
      }

      getInfo2(url: string, id: number ) {
        let headers = new HttpHeaders();
        headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify({ItemCode: id});
        return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
        .pipe(retry(1), catchError(this.errorHandl));
      }

      getprod(ccita: string) {
        let headers = new HttpHeaders();
        headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify({ccita:ccita});
        return this.http.post(`${this.API_URI}` + '/cita/SelectProd', body, { headers: headers })
        .pipe(retry(1), catchError(this.errorHandl));
      }
    saveproduc(cita:any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.API_URI}`+'/cita/products', cita)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    DeleteProducto(ccita: any,itemcode:any)
    {
   
   
       return this.http.delete(`${this.API_URI}` + '/cita/deleteproducts' + `/${ccita}`+ `/${itemcode}`);
     
     
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
