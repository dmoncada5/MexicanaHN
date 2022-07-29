import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {ReportesService} from '../../reportes.service';
@Component({
  selector: 'app-saldo-cliente',
  templateUrl: './saldo-cliente.component.html',
  styleUrls: ['./saldo-cliente.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SaldoClienteComponent implements OnInit {



  datos:any;
  pageType:any;
  socios: any[] = [{
    csocio: null,
    nombre: null
}];
filteredSocios: Observable < any[] > ;
socioCtrl = new FormControl();
nombreSocio:any;
SocioCode:any;
totalfacturas:number=0;
totalpagado:number=0;
totalvencido:number=0;
desde:any;
hasta: any;
  constructor(private ReportesService: ReportesService,
              private activatedRoute: ActivatedRoute,
              ) { 
                this.ReportesService.getAll('/socios').subscribe(
                  (res : any[]) => {
                      this.socios = res;
                   
                      this.filteredSocios = this.socioCtrl.valueChanges
                          .pipe(
                              startWith(''),
                              map(state => state ? this._filterSocios(state) : this.socios.slice())
                          );
                  }
              );

    



  }
  getFormattedDate( originalDate ){
    originalDate=new Date(originalDate);
 return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}
  ngOnInit(): void {



  }
  private _filterSocios(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.socios.filter(option => option.nombre.toLowerCase().includes(filterValue));
}
complete(event){

  this.ReportesService.getOneSocio('/socios/edit', event.target.value).subscribe(
    (res) => {
     
        this.SocioCode = event.target.value;
        this.nombreSocio = res[0]['nombre'];
        
//         this.ReportesService.getData('/Rfinanzas/SaldoCliente',this.SocioCode).subscribe(
//           (res)=>{
//            this. datos=res;

//            this.totalfacturas=0;
//            this.totalpagado=0;
//            this.totalvencido=0;
// for(let i=0; i<this.datos.length;i++){
//   this.totalfacturas+=this.datos[i]["TotalDoc"];
//   this.totalpagado+=this.datos[i]["TotalPagado"];
//   this.totalvencido+=this.datos[i]["SaldoVencido"];
// }

//           }
//         )
    },
    (err) => {
        console.log(err);
    }
)
}

report(){

  this.ReportesService.getDataReport('/Rfinanzas/SaldoCliente',this.SocioCode,this.desde,this.hasta).subscribe(
              (res)=>{
         
               this. datos=res;
    
               this.totalfacturas=0;
               this.totalpagado=0;
               this.totalvencido=0;
    for(let i=0; i<this.datos.length;i++){
      
      this.totalfacturas+=this.datos[i]["TotalDoc"];
      this.totalpagado+=this.datos[i]["TotalPagado"];
      this.totalvencido+=this.datos[i]["SaldoVencido"];

    }
    
              }
            )


  
}
}
