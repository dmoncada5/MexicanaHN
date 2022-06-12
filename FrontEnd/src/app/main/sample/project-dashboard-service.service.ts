import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectDashboardServiceService {
  projects: any[];
  widgets: any[];
  API_URI = environment.ipKey;
  constructor(      private _httpClient: HttpClient) {
    
   }
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
   {

       return new Promise<void>((resolve, reject) => {

           Promise.all([
              this.getProjects(),
              this.getWidgets()
           ]).then(
               () => {
                   resolve();
               },
               reject
           );
       });
   }
   getProjects(): Promise<any>
   {
       return new Promise((resolve, reject) => {
        this._httpClient.get('api/project-dashboard-projects')

               .subscribe((response: any) => {
                   this.projects = response;
                   resolve(response);
               }, reject);
       });
   }

   /**
    * Get widgets
    *
    * @returns {Promise<any>}
    */
   getWidgets(): Promise<any>
   {
       return new Promise((resolve, reject) => {
        this._httpClient.get('api/project-dashboard-widgets')
               .subscribe((response: any) => {
                   this.widgets = response;
                   resolve(response);
               }, reject);
       });
   }


   getWidFactura(url: string) {
      return this._httpClient.get(`${this.API_URI}` + url);
   }
}
