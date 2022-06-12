import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from './login/login.service'
@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private authSvc:LoginService,
    private router: Router,
    private _matSnackBar: MatSnackBar,){
    }


canActivate(
next: ActivatedRouteSnapshot,
state: RouterStateSnapshot): Observable<boolean | UrlTree> | 
Promise<boolean | UrlTree>
| boolean | UrlTree {


if (!this.authSvc.getStorage()){




return true;
}else{
this.router.navigate(['/configuracion/inicio']);
return false;
}

}
  
}
