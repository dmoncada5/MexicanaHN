import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {PrintNotaCreditoPService} from '../print-notacreditop.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-printnotacreditop',
  templateUrl: './printnotacreditop.component.html',
  styleUrls: ['./printnotacreditop.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrintnotacreditopComponent implements OnInit {
  Encabezado:any={
    TotalDoc:0
  };
  Detalle:any;
  doc:any={
DocNum:''
  }
  pageType:any;
  constructor(private prtservice: PrintNotaCreditoPService,
              private activatedRoute: ActivatedRoute,
              ) { 
    const params = this.activatedRoute.snapshot.params;
    this.pageType = params.id;
this.doc.DocNum=this.pageType; 
console.log(this.pageType)
    this.prtservice.getNotaCredito('/notacreditop/Encabezado',this.doc).then(
      res=>{
        this.Encabezado=res[0];
        console.log('detalle',this.Encabezado)
      }
    );
    this.prtservice.getDetalle('/notacreditop/Detalle',this.doc.DocNum).subscribe(
      (res)=>{
        this.Detalle=res;
    
      }, 
      (err)=>{console.log(err);}
    );
    



  }

  ngOnInit(): void {



  }

}
