import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  API_URI = environment.ipKey;
  constructor(private http: HttpClient, private router: Router) { }
  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }
  getUserOne(url: string,usuario:string,clave:string,comp:number) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({usuario:usuario,clave:clave,ccomp:comp});
    return this.http.post(`${this.API_URI}` + url, body,{ headers: headers })
    .pipe(retry(1),catchError(this.errorHandl));
  }
  getPermisos(url: string,usuario:string,estructura:string) {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set("Content-Type", "application/json");
    let body = JSON.stringify({usuario:usuario,estructura:estructura});
    return this.http.post(`${this.API_URI}` + url, body,{ headers: headers })
    .pipe(retry(1),catchError(this.errorHandl));
  }

  getPermisos1(url: string,usuario:string,estructura:string): Promise<any>
  {

    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = new HttpHeaders().set("Content-Type", "application/json");
      let body = JSON.stringify({usuario:usuario,estructura:estructura});
      this.http.post(`${this.API_URI}` + url, body, {headers: headers} )
              .subscribe((response: any) => {
               resolve(response);
              }, reject);
      });
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


 saveStorage(usuario:string){
  localStorage.setItem('usuario',JSON.stringify(usuario));
  }

 getStorage():boolean {
  let user=JSON.parse(localStorage.getItem('usuario'));
  return  (user!==null)? true: false;
  }







}
