import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PrintPedidoService 
{
    invoice: any;
    invoiceOnChanged: BehaviorSubject<any>;
 
    API_URI = environment.ipKey;
    constructor(
        private _httpClient: HttpClient
    )
    {
           this.invoiceOnChanged = new BehaviorSubject({});
    }

    getPedido(url: string,id:number | string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${this.API_URI}`+url , id )
                .subscribe((response: any) => {
                 resolve(response);
                }, reject);
        });
    }

  
    getDetalle(url: string,id:number | string)
    {

        let headers = new HttpHeaders();
        headers = new HttpHeaders().set("Content-Type", "application/json");
        let body = JSON.stringify({DocNum: id});
        return this._httpClient.post(`${this.API_URI}` + url, body,{ headers: headers })
        .pipe(retry(1),catchError(this.errorHandl));
      
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
