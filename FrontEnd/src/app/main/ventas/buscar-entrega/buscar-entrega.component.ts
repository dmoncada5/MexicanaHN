import { Component, ElementRef, Inject, OnInit ,ViewChild,ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuscarEntregaService} from './buscar-entrega.service'
import { pedidoEncabezado} from '../interfaces/interfaces'
import { fuseAnimations } from '@fuse/animations';
import { DataSource } from '@angular/cdk/collections';
import { FuseUtils } from '@fuse/utils';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-entrega',
  templateUrl: './buscar-entrega.component.html',
  styleUrls: ['./buscar-entrega.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class BuscarEntregaComponent implements OnInit {

  displayedColumns = [ 'DocNum', 'SocioCode', 'NombreSocio','TotalDoc', 'fechaDoc'];
  facturas:any;
  dataSource: FilesDataSource | null;
  private _unsubscribeAll: Subject<any>;
@ViewChild(MatPaginator, {static: true})
paginator: MatPaginator; 

@ViewChild(MatSort, {static: true})
sort: MatSort;

@ViewChild('filter', {static: true})
filter: ElementRef;

  constructor(  public matDialogRef: MatDialogRef<BuscarEntregaComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private   BuscarEntrega: BuscarEntregaService,
                private router: Router) { 

    this._unsubscribeAll = new Subject();

    // if (_data.action==='edit'){
      
  }

//   get = (meal, callback) => {

//     this.ServicioBuscar.getpedidos("/factura").then((res)=>{
// console.log('call',res)
// callback(res);
//     });
//   }

getFormattedDate( originalDate ){
    originalDate=new Date(originalDate);
    return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}
  ngOnInit(): void {
    // this.get('Lasagna', (valida) => {
        this.dataSource = new FilesDataSource(this.BuscarEntrega, this.paginator, this.sort);

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

}



export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');


    constructor(
        private BuscarEntrega:  BuscarEntregaService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this.BuscarEntrega.facturas;
       
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.BuscarEntrega.onProductsChanged,
           this._matPaginator.page,
            this._filterChange,
          this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this.BuscarEntrega.facturas.slice();

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
