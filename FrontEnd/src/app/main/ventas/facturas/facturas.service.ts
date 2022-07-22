import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import {cotizacionEncabezado, cotizacionDetalle, facturaEncabezado, facturaDetalle} from '../../ventas/interfaces/interfaces';
import { format } from 'date-fns';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  onProductsChanged: BehaviorSubject<any>;
  facturas: facturaEncabezado[];
facturasD: facturaDetalle[];
  
API_URI = environment.ipKey;


  constructor(private http: HttpClient) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([

              this.getfacturas('/factura/todo', 'FACTURA')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  } 
  getfacturas(url: string, documento: string): Promise<any>
  {

    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = new HttpHeaders().set('Content-Type', 'application/json');
      const body = JSON.stringify({tipo_documento: documento});
      this.http.post(`${this.API_URI}` + url, body, {headers: headers} )
              .subscribe((response: any) => {
                  this.facturas = response;
       
                  this.onProductsChanged.next(this.facturas);
                  resolve(response);
              }, reject);
      });
  }
  // tslint:disable-next-line: typedef
  getnumeracion(url: string, ccomp: number | string, documento: string ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ccomp: ccomp, tipo_documento: documento});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }


  getformato(url: string, numero: number ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({numero: numero});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getOnenumeracion(url: string, ccomp: number | string, documento: string, csuc: number ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ccomp: ccomp, tipo_documento: documento, csuc: csuc});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }

  getPagos(url: string, NDocumento: string ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({NDocumento: NDocumento});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getOne(url: string, id: number | string, ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({DocNum: id});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getbodegasCompany(url: string, ccomp: number  ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ccomp: ccomp});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getOneSocio(url: string, id: number | string, ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({csocio: id});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getOneProduct(url: string, id: number | string, ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ItemCode: id});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getPrice(url: string, id: number | string, pricelist: number) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ItemCode: id, Pricelist: pricelist});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getInfo(url: string, id: number | string, pricelist: number) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ItemCode: id, Pricelist: pricelist});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getExistencia(url: string, id: number | string, cbod: number) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ItemCode: id, cbod: cbod});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  ExcExistencia(url: string, id: number | string, cbod: number | string,tipo:string) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ItemCode: id, cbod: cbod,tipo:tipo});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getDetallePromo(url: string, DocNum: string ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({DocNum: DocNum});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
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
 updatefacturaEncabezado(cotizacion: any): Promise<any>
 {
        return new Promise((resolve, reject) => {
         this.http.put(`${this.API_URI}` + '/factura/Encabezado', cotizacion)
             .subscribe((response: any) => {
                   resolve(response);
             }, reject);
     });
 }
 updatestatus(DocNum: number, status: string): Promise<any>
 {
        return new Promise((resolve, reject) => {
          let headers = new HttpHeaders();
          headers = new HttpHeaders().set('Content-Type', 'application/json');
          console.log(DocNum);
          const body = JSON.stringify({DocNum: DocNum, status: status});
          this.http.put(`${this.API_URI}` + '/pedido/statusP', body, {headers: headers})
             .subscribe((response: any) => {
                   resolve(response);
             }, reject);
     });
 }
 updatestatusC(DocNum: number, status: string): Promise<any>
 {
        return new Promise((resolve, reject) => {
          let headers = new HttpHeaders();
          headers = new HttpHeaders().set('Content-Type', 'application/json');
          const body = JSON.stringify({DocNum: DocNum, status: status});
          this.http.put(`${this.API_URI}` + '/cotizacion/statusC', body, {headers: headers})
             .subscribe((response: any) => {
                   resolve(response);
             }, reject);
     });
 }
 updatefacturaDetalle(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.put(`${this.API_URI}` + '/factura/Detalle', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
 addfacturaEncabezado(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/factura/postearEncabezado', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
addfacturaDetalle(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/factura/postearDetalle', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }

 permisoEliminarPago(){
  let headers = new HttpHeaders();
  headers = new HttpHeaders().set("Content-Type", "application/json");
  let user=JSON.parse(localStorage.getItem('usuario'));
  let body = JSON.stringify({usuario:user.tipoUser,estructura:'Eliminar pagos'});
  return new Promise((resolve, reject) => {
  this.http.post(`${this.API_URI}` + '/login/permisos', body, {headers: headers} )
  .subscribe((response: any) => {
   resolve(response);
  }, reject);
});
 }
 setExistencia(url: string, id: number | string, cbod: number | string, cantidad: number) {
  let headers = new HttpHeaders();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  const body = JSON.stringify({ItemCode: id, cbod: cbod, cantidad: cantidad});
  return new Promise((resolve, reject) => {
    this.http.post(`${this.API_URI}` + url, body, { headers: headers })
        .subscribe((response: any) => {
         resolve(response);
        }, reject);
});
}
 updateCorrelativo(cnum: number): Promise<any>
 {
  let headers = new HttpHeaders();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  const body = JSON.stringify({cnum: cnum});

  return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/numeracion/updateC', body, { headers: headers })
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
 DeletefacturaDetalle(DocNum: number)
 {
    return this.http.delete(`${this.API_URI}` + '/factura' + `/${DocNum}`);
 }

 addpago(pago: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/pago/pago', pago)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
 Deletepago(pagoId: any)
 {

    return this.http.delete(`${this.API_URI}` + '/pago/deletepago' + `/${pagoId}`);
  
  
 }
 addDetallepago(url: string, pago: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + url, pago)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }

}

