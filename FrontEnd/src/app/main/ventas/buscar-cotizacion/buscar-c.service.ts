import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { cotizacionEncabezado, cotizacionDetalle} from '../../ventas/interfaces/interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscarCService {
  onProductsChanged: BehaviorSubject<any>;
  cotizaciones: cotizacionEncabezado[];
comprasD: cotizacionDetalle[];
 
API_URI = environment.ipKey;

  constructor(private http: HttpClient) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([

              this.getCotizaciones('/cotizacion/bcotizacion')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }
  getCotizaciones(url: string): Promise<any>
  {
  
    return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URI}` + url )
              .subscribe((response: any) => {
                  this.cotizaciones = response;
                  console.log(this.cotizaciones)
                  this.onProductsChanged.next(this.cotizaciones);
                  resolve(response);
              }, reject);
      });
  }


  // getAll(url: string) {
  //   return this.http.get(`${this.API_URI}` + url);
  // }
 getAll(url: string) {
    this.getCotizaciones('/cotizacion/bcotizacion');
    return this.http.get(`${this.API_URI}` + url);
   }
}
