import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrdenEncabezado, OrdenDetalle} from '../interfaces/interfaces';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BuscarOService {
  onProductsChanged: BehaviorSubject<any>;
  pcompras: OrdenEncabezado[];
pcomprasD: OrdenDetalle[];
 
API_URI = environment.ipKey;

  constructor(private http: HttpClient) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([

              this.getCompras('/pcompra/compras')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }
  getCompras(url: string): Promise<any>
  {
  
    return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URI}` + url )
              .subscribe((response: any) => {
                  this.pcompras = response;
                  console.log(this.pcompras);
                  this.onProductsChanged.next(this.pcompras);

                  resolve(response);
              }, reject);
      });
  }


  // getAll(url: string) {
  //   return this.http.get(`${this.API_URI}` + url);
  // }
 getAll(url: string) {
    this.getCompras('/pcompra/compras');
    return this.http.get(`${this.API_URI}` + url);
   }
}
