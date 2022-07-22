import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { pedidoEncabezado, pedidoDetalle} from '../../ventas/interfaces/interfaces';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BuscarPService {
  onProductsChanged: BehaviorSubject<any>;
  pedidos: pedidoEncabezado[];
comprasD: pedidoDetalle[];

 
API_URI = environment.ipKey;
 

  constructor(private http: HttpClient) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([

              this.getpedidos('/pedido/pedidos')
            
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
                  this.pedidos = response;
                
                  this.onProductsChanged.next(this.pedidos);
                  resolve(response);
              }, reject);
      });
  }


  getAll(url: string) {
    this.getpedidos("/pedido/pedidos");
    return this.http.get(`${this.API_URI}` + url);
  }
}
