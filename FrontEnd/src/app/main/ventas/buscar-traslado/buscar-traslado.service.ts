import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { solicitudtEncabezado, solicitudtDetalle} from '../interfaces/interfaces';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BuscarTrasladoService {
  onProductsChanged: BehaviorSubject<any>;
  facturas: solicitudtEncabezado[];
comprasD: solicitudtDetalle[];
 
API_URI = environment.ipKey;

  constructor(private http: HttpClient) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([

              this.getFacturas('/solicitudt/solicitudes')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }
  getFacturas(url: string): Promise<any>
  {
  
    return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URI}` + url )
              .subscribe((response: any) => {
                  this.facturas = response;

                  this.onProductsChanged.next(this.facturas);
                  resolve(response);
              }, reject);
      });
  }


  // getAll(url: string) {
  //   return this.http.get(`${this.API_URI}` + url);
  // }
 getAll(url: string) {
    this.getFacturas('/solicitudt/solicitudes');
    return this.http.get(`${this.API_URI}` + url);
   }
}
