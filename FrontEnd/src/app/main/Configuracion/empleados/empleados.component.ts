//import { Component, OnInit } from '@angular/core';
import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged,map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { EmpleadosService } from './empleados.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class EmpleadosComponent implements OnInit {
  dataSource: FilesDataSource | null;
  //displayedColumns = ['cemp','ccomp', 'csuc','cpais','cdepa','cmuni','careat','nombres','apellidos','identidad','genero','rtn','edad','tipo_sangre','direccion','telefono','celular','correo','observaciones','fecha_ingreso', 'estado'];
  displayedColumns = ['cemp','empresa', 'sucursal','area','nombres','apellidos','identidad','rtn','direccion','telefono','celular', 'estado'];


  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  @ViewChild('filter', {static: true})
  filter: ElementRef;
 
  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(private empleadosServices: EmpleadosService) {
    this._unsubscribeAll = new Subject();
   }

  ngOnInit(): void {
    this.dataSource = new FilesDataSource(this.empleadosServices, this.paginator, this.sort);
   
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


        console.log(this.dataSource);
  }

}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {empleadosServices} empleadosServices
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private empleadosServices: EmpleadosService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort 
    )
    {
        super();

        this.filteredData = this.empleadosServices.products;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.empleadosServices.onProductsChanged,
           this._matPaginator.page,
            this._filterChange,
           this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this.empleadosServices.products.slice();

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
               case 'cemp':
                    [propertyA, propertyB] = [a.emp, b.cemp];
                    break;
               case 'empresa':
                    [propertyA, propertyB] = [a.empresa, b.empres];
                    break;
               case 'sucursal':
                    [propertyA, propertyB] = [a.sucursal, b.sucursal];
                    break;
            /*    case 'cpais':
                    [propertyA, propertyB] = [a.cpais, b.cpais];
                    break;
                case 'cdepa':
                    [propertyA, propertyB] = [a.cdepa, b.cdepa];
                    break;
                case 'cmuni':
                    [propertyA, propertyB] = [a.cmuni, b.cmuni];
                    break; */
                case 'area':
                    [propertyA, propertyB] = [a.area, b.area];
                    break;
                case 'nombres':
                    [propertyA, propertyB] = [a.nombres, b.nombres];
                    break;
                case 'apellidos':
                    [propertyA, propertyB] = [a.apellidos, b.apellidos];
                    break;
                case 'estado':
                    [propertyA, propertyB] = [a.estado, b.estado];
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



