import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { cotizacionEncabezado,cotizacionDetalle} from '../../ventas/interfaces/interfaces';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BuscarCService {
  onProductsChanged: BehaviorSubject<any>;
  cotizacion: cotizacionEncabezado[];
  cotizacionD: cotizacionDetalle[];
 
API_URI = environment.ipKey;
 
 

  constructor(private http: HttpClient) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([

              this.getpedidos('/cotizacion/bcotizacion')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }
  getpedidos(url: string): Promise<any>
  {
  
    return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URI}` + url )
              .subscribe((response: any) => {
                  this.cotizacion= response;
                 this.onProductsChanged.next(this.cotizacion);
                  resolve(response);
              }, reject);
      });
  }


  getAll(url: string) {
    this.getpedidos("/cotizacion/bcotizacion");
    return this.http.get(`${this.API_URI}` + url);
  }
}