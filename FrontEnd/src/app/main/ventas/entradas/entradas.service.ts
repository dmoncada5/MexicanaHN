import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { entradaEncabezado, entradaDetalle} from '../interfaces/interfaces';
import { format } from 'date-fns';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EntradasService {
  onProductsChanged: BehaviorSubject<any>;
  entradas: entradaEncabezado[];
pedidosD: entradaDetalle[];
 
API_URI = environment.ipKey;

  constructor(private http: HttpClient) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([ 

              this.getEntradas('/entrada/todo', 'ENTRADA')
            
          ]).then(
              () => { 
                  resolve();
              },
              reject
          ); 
      });
  } 
  getEntradas(url: string, documento: string): Promise<any>
  {

    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = new HttpHeaders().set('Content-Type', 'application/json');
      const body = JSON.stringify({tipo_documento: documento});
      this.http.post(`${this.API_URI}` + url, body, {headers: headers} )
              .subscribe((response: any) => {
                  this.entradas = response;
       
                  this.onProductsChanged.next(this.entradas);
                  resolve(response);
              }, reject);
      });
  }
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
  getAllT(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }
  getOne(url: string, id: number | string ) {
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
  getInfoComp(url: string, id: number | string) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ItemCode: id});
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
  ExcExistencia(url: string, id: number | string, cbod: number,tipo:string) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ItemCode: id, cbod: cbod,tipo:tipo});
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
 updatepedidoEncabezado(cotizacion: any): Promise<any>
 {
        return new Promise((resolve, reject) => {
         this.http.put(`${this.API_URI}` + '/entrada/Encabezado', cotizacion)
             .subscribe((response: any) => {
                   resolve(response);
             }, reject);
     });
 }

 
 updatepedidoDetalle(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.put(`${this.API_URI}` + '/entrada/Detalle', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
 addpedidoEncabezado(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/entrada/postearEncabezado', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
addpedidoDetalle(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/entrada/postearDetalle', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
 setExistencia(url: string, id: number | string, cbod: number, cantidad: number) {
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


updatestatusC(DocNum: number|string, status: string): Promise<any>
{
       return new Promise((resolve, reject) => {
         let headers = new HttpHeaders();
         headers = new HttpHeaders().set('Content-Type', 'application/json');
         const body = JSON.stringify({DocNum: DocNum, status: status});
         this.http.put(`${this.API_URI}` + '/entrada/statusP', body, {headers: headers})
            .subscribe((response: any) => {
                  resolve(response);
            }, reject);
    });
}

 ordenExistencia(url: string, id: number | string, cbod: number, cantidad: number) {
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


comprasExistencia(url: string, id: number | string, cbod: number, cantidad: number) {
  let headers = new HttpHeaders();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  const body = JSON.stringify({ItemCode: id, cbod: cbod,cantidad:cantidad});
  return new Promise((resolve, reject) => {
    this.http.post(`${this.API_URI}` + url, body, { headers: headers })
        .subscribe((response: any) => {
         resolve(response);
        }, reject);
});
}



 DeletepedidoDetalle(DocNum: number)
 {
    return this.http.delete(`${this.API_URI}` + '/entrada' + `/${DocNum}`);
 }
}

