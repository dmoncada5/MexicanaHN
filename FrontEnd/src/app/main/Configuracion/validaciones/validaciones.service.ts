import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {
  results: any[];
  API_URI = environment.ipKey;
  constructor(private http: HttpClient, private router: Router) { 

  }


  update(val: any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.API_URI}` + '/validaciones/', val)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    
  getAll(url: string) {
    return this.http.get(`${this.API_URI}` + url);
  }
}
