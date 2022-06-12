import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {notacreditoEncabezado, notacreditoDetalle} from '../interfaces/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { NotaCreditosService } from '../notacreditos/notacreditos.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { FuseUtils } from '@fuse/utils';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { BuscarFacturaComponent } from '../buscar-factura/buscar-factura.component';
import { BuscarEntregaComponent } from '../buscar-entrega/buscar-entrega.component';


@Component({
  selector: 'app-notacreditos',
  templateUrl: './notacreditos.component.html',
  styleUrls: ['./notacreditos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class NotaCreditosComponent implements OnInit {
  displayedColumns = [ 'DocNum', 'SocioCode', 'NombreSocio', 'TotalDoc', 'fechaDoc'];
  cztEncabezado: notacreditoEncabezado = {
    DocNum: null,
    fechaDoc: null,	
    SocioCode: null,
    NombreSocio: null,
    Direccion: null,
    impuesto: null,
    tasa: null,
    TotalDoc: null,
    DescPorcentaje: null,
    Moneda: null,
    comentarios: null,
    vendedor: null,
    LastUpdate: null,	 
    UserCreate: null,

  };
  cztDetalle: notacreditoDetalle = {
    DocNum: null,
    Linea: null,
    itemCode: null,
    itemName: null,
    cantidad: null,
    precio: null,  
    DescuentoLine: null,
    impuestocod: null,
    totaLine: null,
    almacen: null,
  };
  dataSource: FilesDataSource | null;
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  @ViewChild('filter', {static: true})
  filter: ElementRef;
  @ViewChild('dialogContent')
  // Private
  private _unsubscribeAll: Subject<any>;

  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(private notacreditoServcies: NotaCreditosService,
              public _matDialog: MatDialog,
              private router: Router) {

    this._unsubscribeAll = new Subject();

   }
   getFormattedDate( originalDate ){
       originalDate = new Date(originalDate);
       return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}

   ngOnInit(): void {
    
    this.dataSource = new FilesDataSource(this.notacreditoServcies, this.paginator, this.sort);
   
    fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(150),
            distinctUntilChanged()
        )
        .subscribe(() => {
            if ( !this.dataSource )
            {
                return;
            }

            this.dataSource.filter = this.filter.nativeElement.value;
        });
  }

//   ngOnDestroy(): void
//   {
//       // Unsubscribe from all subscriptions
//       this._unsubscribeAll.next();
//       this._unsubscribeAll.complete();
//   }

  editContact(contact): void
  {
  
      if (contact ==='FACTURA'){
      this.dialogRef = this._matDialog.open(BuscarFacturaComponent, {
          panelClass: 'contact-form-dialog',
          data      : {
              contact: contact,
              action : 'edit'
                      },
                    
      });

      this.dialogRef.afterClosed()
          .subscribe(response => {
    
              if ( !response )
              {
                  return;
              }
              const actionType: string = response[0];
              const formData: any = response[1];

          
   
              switch ( actionType )
              {
                  /**
                   * Save
                   */
                  case 'seleccion':

                    this.router.navigate(['ventas/notacreditos/' + formData.numero + '/' + 'factura']);
                    //  this._contactsService.updateContact(formData.getRawValue());
// console.log("selecc",formData.getRawValue());


                    break;
                  /**
                   * Delete
                   */
                  case 'delete':

                      this.deleteContact(contact);

                      break;
              }
          });

        }



        if (contact ==='ENTREGA'){
            this.dialogRef = this._matDialog.open(BuscarEntregaComponent, {
                panelClass: 'contact-form-dialog',
                data      : {
                    contact: contact,
                    action : 'edit'
                            },
                          
            });
      
            this.dialogRef.afterClosed()
                .subscribe(response => {
          
                    if ( !response )
                    {
                        return;
                    }
                    const actionType: string = response[0];
                    const formData: any = response[1];
      
                
         
                    switch ( actionType )
                    {
                        /**
                         * Save
                         */
                        case 'seleccion':
      
                          this.router.navigate(['ventas/notacreditos/' + formData.numero + '/' + 'entrega']);
                          //  this._contactsService.updateContact(formData.getRawValue());
      // console.log("selecc",formData.getRawValue());
      
      
                          break;
                        /**
                         * Delete
                         */
                        case 'delete':
      
                            this.deleteContact(contact);
      
                            break;
                    }
                });
      
              }
      



  }

  deleteContact(contact): void
  {}


}



export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {paisesServices} paisesServices
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private notacreditoServcies: NotaCreditosService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this.notacreditoServcies.notacreditos;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.notacreditoServcies.onProductsChanged,
           this._matPaginator.page,
            this._filterChange,
           this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this.notacreditoServcies.notacreditos.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data 
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'DocNum':
                    [propertyA, propertyB] = [a.DocNum, b.DocNum];
                    break;
                case 'NombreSocio':
                    [propertyA, propertyB] = [a.NombreSocio, b.NombreSocio];
                    break;
                case 'fechadoc':
                    [propertyA, propertyB] = [a.fechadoc, b.fechadoc];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /** 
     * Disconnect
     */
    disconnect(): void
    {
    }
}

