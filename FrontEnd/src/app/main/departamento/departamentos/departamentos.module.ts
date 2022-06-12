import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { DepartamentosComponent } from './departamentos.component';


const routes = [
    {
        path     : 'departamento/departamentos',
        component: DepartamentosComponent
    }
];


@NgModule({
    declarations: [
        DepartamentosComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        DepartamentosComponent
    ]
})

export class departamentosModule
{
}
