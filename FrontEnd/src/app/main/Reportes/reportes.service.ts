import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  API_URI = environment.ipKey;
  constructor(   private _httpClient: HttpClient) { }


  getAll(url: string) {
    return this._httpClient.get(`${this.API_URI}` + url);
  }
  getData(url: string,code:string) {
    return this._httpClient.get(`${this.API_URI}` + url+`/${code}`);
  }


  getDataReport(url: string, SocioCode: string, desde:string,hasta:string) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({SocioCode: SocioCode,desde:desde,hasta:hasta});
    return this._httpClient.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getOneSocio(url: string, id: number | string, ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({csocio: id});
    return this._httpClient.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getpagoRecibidos(url: string, desde : Date, hasta:Date ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({Desde: desde, Hasta: hasta});
    return this._httpClient.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  CierreDiario(url: string, desde : Date, hasta:Date ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({Desde: desde, Hasta: hasta});
    return this._httpClient.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getarticulosVendidos(url: string, desde : Date, hasta:Date ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({Desde: desde, Hasta: hasta});
    return this._httpClient.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getSociosCategoria(url: string, categoria :number ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({categoria: categoria});
    return this._httpClient.post(`${this.API_URI}` + url, body, { headers: headers })
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getSociosGrupo(url: string, grupo :number ) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({grupo: grupo});
    return this._httpClient.post(`${this.API_URI}` + url, body, { headers: headers })
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
}
