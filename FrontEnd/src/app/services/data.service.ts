import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Interfaces/user';

import { retry, catchError } from 'rxjs/operators';
//import { throwError } from 'rxjs';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router'

import { map } from 'rxjs/operators'
import { Console } from 'console';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class DataService {

  API_URI = environment.ipKey;
 //API_URI = "http://207.244.252.44:3000/api";
 //  API_URI = 'http://localhost:3000/api';
   //API_URI = "http://207.244.252.44:3000/api";
 
   constructor(private http: HttpClient, private router: Router) { }
 
   getAll(url: string) {
     return this.http.get(`${this.API_URI}` + url);
   }
   getAllMio(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }



   getOne(id: string, url: string) {

    return this.http.get(`${this.API_URI}` + url + `/${id}`);
}

deleteData(id: number, url: string) {
  return this.http.delete(`${this.API_URI}` + url + `/${id}`);
}

updateData(id: string|number, updated: User , url: string): Observable<User> {
  return this.http.post(`${this.API_URI}` + url + `/${id}`, updated);
}

 getTTDepartamentos(url: string) {
    let headers = new HttpHeaders();
   // headers = new HttpHeaders().set("Content-Type", "application/json");
   // let body = JSON.stringify({cproy:cproy });
    return this.http.post(`${this.API_URI}` + url+'/pos',{ headers: headers })
   // return this.http.post(`${this.API_URI}` + url+'/pos', body,{ headers: headers })
    //.pipe(retry(1),catchError(this.errorHandl));
  }

addNewData(Usuario: User, url: string) {
   let headers = new HttpHeaders();
   headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this.http.post(`${this.API_URI}` + url , JSON.stringify(Usuario), {headers: headers})
   .pipe(
    retry(1),
    catchError(this.errorHandl)    
  );
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