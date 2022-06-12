import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { promoEncabezado, promoDetalle} from '../interfaces/interfaces';
import { format } from 'date-fns';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PromosService {
  onProductsChanged: BehaviorSubject<any>;
  promos: promoEncabezado[];
promosD: promoDetalle[];

API_URI = environment.ipKey;

  constructor(private http: HttpClient) { 
    this.onProductsChanged = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise <void>((resolve, reject) => {

          Promise.all([

              this.getPromos('/promo/todo', 'P')
            
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  } 

//   getPromos(url: string): Promise<any>
//   {
//       return new Promise((resolve, reject) => {
//           this.http.get(`${this.API_URI}` + url )
//               .subscribe((response: any) => {
//                   this.promos = response;
//                   this.onProductsChanged.next(this.promos);
//                   resolve(response);
//               }, reject);
//       });
//   }


  getPromos(url: string, tipo: string): Promise<any>
   {

     return new Promise((resolve, reject) => {
       let headers = new HttpHeaders();
       headers = new HttpHeaders().set('Content-Type', 'application/json');
      const body = JSON.stringify({tipo: tipo});
       this.http.post(`${this.API_URI}` + url, body, {headers: headers} )
              .subscribe((response: any) => {
                   this.promos = response;
       
                   this.onProductsChanged.next(this.promos);
                   resolve(response);
             }, reject);
      });
  }
//   getnumeracion(url: string, ccomp: number | string, documento: string ) {
//     let headers = new HttpHeaders();
//     headers = new HttpHeaders().set('Content-Type', 'application/json');
//     const body = JSON.stringify({ccomp: ccomp, tipo: documento});
//     return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
//     .pipe(retry(1), catchError(this.errorHandl));
//   }


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
    const body = JSON.stringify({ccomp: ccomp, tipo: documento, csuc: csuc});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }
  getAllT(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }
  getOne(url: string, id: string | string, ) {
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
  getInfo(url: string, id: number | string) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ItemCode: id});
    return this.http.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }

  getInfoP(url: string, id: number | string) {
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
 updatepromoEncabezado(cotizacion: any): Promise<any>
 {
        return new Promise((resolve, reject) => {
         this.http.put(`${this.API_URI}` + '/promo/Encabezado', cotizacion)
             .subscribe((response: any) => {
                   resolve(response);
             }, reject);
     });
 }

 
 updatepromoDetalle(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.put(`${this.API_URI}` + '/promo/Detalle', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }

 updateProductPriceList(cotizacion): Promise<any>
 {
     return new Promise((resolve, reject) => {
         this.http.put(`${this.API_URI}` + '/promo/PriceListUpdate', cotizacion)
             .subscribe((response: any) => {
                 resolve(response);
             }, reject
        );
     });
 }


 addpromoEncabezado(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/promo/postearEncabezado', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }
addpromoDetalle(cotizacion: any): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/promo/postearDetalle', cotizacion)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }


 addProductPriceList(bodega): Promise<any>
 {
     return new Promise((resolve, reject) => {
         this.http.post(`${this.API_URI}` + '/promo/PriceList', bodega)
             .subscribe((response: any) => {
                 resolve(response);
             }, reject
        );
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

 promoExistencia(url: string, id: number | string, cbod: number, cantidad: number) {
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



DeletepromoDetalle(DocNum: String): Promise<any>
 {

        return new Promise((resolve, reject) => {
         this.http.delete(`${this.API_URI}` + '/promo' + `/${DocNum}`)
             .subscribe((response: any) => {
              resolve(response);
             }, reject);
     });
 }

//  DeletepromoDetalle(DocNum: String)
//  {
//    return this.http.delete(`${this.API_URI}` + '/promo/' + `${DocNum}`);
//  }
}

