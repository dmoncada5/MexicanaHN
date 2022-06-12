import { Component, OnInit,ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {cotizacionEncabezado,cotizacionDetalle} from '../interfaces/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; 
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { CotizacionesService } from '../cotizaciones/cotizaciones.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { FuseUtils } from '@fuse/utils';
import { ventasModule } from '../ventas.module';


@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class CotizacionesComponent implements OnInit {
    [x: string]: any;
  displayedColumns = [ 'DocNum', 'SocioCode', 'NombreSocio','TotalDoc', 'fechaDoc'];
  cztEncabezado: cotizacionEncabezado = {
    DocNum:null,
    fechaDoc:null,	
    SocioCode:null,
    NombreSocio:null,
    Direccion:null,
    impuesto:null,
    tasa:null,
    TotalDoc:null,
    DescPorcentaje:null,
    Moneda:null,
    comentarios:null,
    vendedor:null,
    LastUpdate:null,	
    UserCreate:null,

  };
  cztDetalle:cotizacionDetalle={
    DocNum:null,
    Linea:null,
    itemCode:null,
    itemName:null,
    cantidad:null,
    precio:null,  
    DescuentoLine:null,
    impuestocod:null,
    totaLine:null,
    almacen:null,
  };
  valEliminar:any;
  dataSource: FilesDataSource | null;
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  @ViewChild('filter', {static: true})
  filter: ElementRef;

  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(private CotizacionesService: CotizacionesService) {
    this.valEliminar=true;
    this._unsubscribeAll = new Subject();

   }

   getFormattedDate( originalDate ){
    originalDate=new Date(originalDate);
 return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}
   ngOnInit(): void {
    this.valEliminar=true;
    this.dataSource = new FilesDataSource(this.CotizacionesService, this.paginator, this.sort);

   
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



  
//   update(){






//     this.CotizacionesService.DeleteCotizacionDetalle( this.docum.DocNum).subscribe(
//         res=>{

    
//             this._matSnackBar.open('Cotizacion Modificada!', 'OK', {
//                 verticalPosition: 'top',
//                 duration        : 2000
//             });
         
//             // Change the location with new one
  

// })

    


//   }

//   borrarFila(DocNum: string) {
//       this.valEliminar=false;
//     this.dataSource.filter = this.filter.nativeElement.value;
//     if (confirm("Realmente quiere borrarlo?"+DocNum)) {



//         this.CotizacionesService.updatestatusC(DocNum,'C');

//     //     this.dataSource.splice(cod, 1);
//     //   this.tabla1.renderRows();

//     this.
//     this.router.navigate(['ventas/cotizaciones']);
//     }
  
//     this.dataSource = new FilesDataSource(this.CotizacionesService, this.paginator, this.sort);


//     this.router.navigate(['ventas/cotizaciones']);
//   }
  //this.router.navigate(['ventas/cotizaciones']);
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
        private CotizacionesService: CotizacionesService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this.CotizacionesService.cotizaciones;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.CotizacionesService.onProductsChanged,
           this._matPaginator.page,
            this._filterChange,
           this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this.CotizacionesService.cotizaciones.slice();

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

