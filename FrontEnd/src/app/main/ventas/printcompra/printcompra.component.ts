import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {PrintCompraService} from '../print-compra.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-printcompra',
  templateUrl: './printcompra.component.html',
  styleUrls: ['./printcompra.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrintcompraComponent implements OnInit {
  Encabezado:any={
    TotalDoc:0
  };
  Detalle:any;
  doc:any={ 
DocNum:''
  }
  pageType:any; 
  constructor(private prtservice: PrintCompraService,
              private activatedRoute: ActivatedRoute,
              ) { 
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
this.doc.DocNum=this.pageType;
console.log(this.pageType)
    this.prtservice.getCompra('/compra/Encabezado',this.doc).then(
      res=>{
        this.Encabezado=res[0];
        console.log('detalle',this.Encabezado)
      }
    );
    this.prtservice.getDetalle('/compra/Detalle',this.doc.DocNum).subscribe(
      (res)=>{
        this.Detalle=res;
    
      },
      (err)=>{console.log(err);}
    );
    

 

  }

  ngOnInit(): void {



  }

}
