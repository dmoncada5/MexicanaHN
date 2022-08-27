import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { compraEncabezado, compraDetalle} from '../../ventas/interfaces/interfaces';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  onProductsChanged: BehaviorSubject<any>;
  compras: compraEncabezado[];
comprasD: compraDetalle[];
 
API_URI = environment.ipKey;
 
 
  constructor(private http: HttpClient) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([

              this.getcompras('/compra/todo', 'COMPRA')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }
  getcompras(url: string, documento: string): Promise<any>
  {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = new HttpHeaders().set('Content-Type', 'application/json');
      const body = JSON.stringify({tipo_documento: documento});
      this.http.post(`${this.API_URI}` + url, body, {headers: headers} )
              .subscribe((response: any) => {
                  this.compras = response;
    
                  this.onProductsChanged.next(this.compras);
                  resolve(response);
              }, reject);
      });
  }

  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }

  getnumeracion(url: string, ccomp: number | string,documento:string ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ccomp:ccomp,tipo_documento:documento});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }

  getformato(url: string, numero: number ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({numero:numero});
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

  getExistencia(url: string, id: number | string, cbod: number | string) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ItemCode: id, cbod: cbod});
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
 
 updateCompraEncabezado(cotizacion: any): Promise<any>
 {
        return new Promise((resolve, reject) => {
         this.http.put(`${this.API_URI}` + '/compra/Encabezado', cotizacion)
             .subscribe((response: any) => {
                   resolve(response);
             }, reject);
     });
 }

  
 updateCompraDetalle(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.put(`${this.API_URI}` + '/compra/Detalle', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
 addCompraEncabezado(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/compra/postearEncabezado', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
addCompraDetalle(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/compra/postearDetalle', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }


 comprasExistencia(url: string, id: number | string, cbod: number | string, cantidad: number,costo:number,FechaVencimiento:string) {
  let headers = new HttpHeaders();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  const body = JSON.stringify({ItemCode: id, cbod: cbod,cantidad: cantidad, costo:costo,FechaVencimiento: FechaVencimiento});
  return new Promise((resolve, reject) => {
    this.http.post(`${this.API_URI}` + url, body, { headers: headers })
        .subscribe((response: any) => {
         resolve(response);
        }, reject);
});
}

setOrdenExistencia(url: string, id: number | string, cbod: number | string, cantidad: number) {
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


updatestatusC(DocNum: number, status: string): Promise<any>
{
       return new Promise((resolve, reject) => {
         let headers = new HttpHeaders();
         headers = new HttpHeaders().set('Content-Type', 'application/json');
         const body = JSON.stringify({DocNum: DocNum, status: status});
         this.http.put(`${this.API_URI}` + '/pcompra/statusC', body, {headers: headers})
            .subscribe((response: any) => {
                  resolve(response);
            }, reject);
    });
}



// compraExistencia(url: string, id: number | string, cbod: number, cantidad: number) {
//   let headers = new HttpHeaders();
//   headers = new HttpHeaders().set('Content-Type', 'application/json');
//   const body = JSON.stringify({ItemCode: id, cbod: cbod, cantidad: cantidad});
//   return new Promise((resolve, reject) => {
//     this.http.post(`${this.API_URI}` + url, body, { headers: headers })
//         .subscribe((response: any) => {
//          resolve(response);
//         }, reject);
// });
// }





 DeleteCompraDetalle(DocNum: number)
 {
    return this.http.delete(`${this.API_URI}` + '/compra' + `/${DocNum}`);
 }
}

