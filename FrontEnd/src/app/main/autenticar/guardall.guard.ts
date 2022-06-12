import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {LoginService} from './login/login.service'
@Injectable({
  providedIn: 'root'
})
export class GuardallGuard implements CanActivate {
  
  API_URI = environment.ipKey;
  constructor(private authSvc:LoginService,
    private router: Router,
    private http: HttpClient,
    private _matSnackBar: MatSnackBar,){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
  
if (this.authSvc.getStorage()){
let user=JSON.parse(localStorage.getItem('usuario'));


return new Promise((resolve, reject) => {
  let headers = new HttpHeaders();
  headers = new HttpHeaders().set("Content-Type", "application/json");
let valor='';

  if (next.params.id==undefined || next.params.id=='new'){
    valor=next.url[1].path;
  }else{
    valor='Update';
  }
  const URL=next.url[0].path+'/'+valor;

  let body = JSON.stringify({usuario:user.tipoUser,estructura:URL});
// console.log(body)
  this.http.post(`${this.API_URI}` + '/login/permisos', body, {headers: headers} )
          .subscribe((response: any) => {
//console.log(response)
            if (response.length==0){
              
              this._matSnackBar.open('Descriminacion de Accesos', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            return false;

            }
            if (response[0]["permiso"]==='Y'){
            // console.log(response)
           resolve(true);
            }else{
              this._matSnackBar.open('Descriminacion de Accesos', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
              // this.router.navigate(['autenticar/auth/login']);
                 return false;
            }
          }, reject);
  });
// return true;
}else{
  this._matSnackBar.open('Descriminacion de Accesos', 'OK', {
    verticalPosition: 'top',
    duration: 2000
});
this.router.navigate(['autenticar/auth/login']);
return false;

}
  }
}
