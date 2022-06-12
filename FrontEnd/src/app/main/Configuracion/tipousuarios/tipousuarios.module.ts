

import { FuseWidgetModule } from './../../../../@fuse/components/widget/widget.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { TipoUsuariosComponent } from './../tipousuarios/tipousuarios.component';
import { TipoUsuariosService } from './../tipousuarios/tipousuarios.service';
import { TipoUsuarioComponent } from './../tipousuario/tipousuario.component';
import { GuardallGuard } from 'app/main/autenticar/guardall.guard';

const routes = [
    {
        path     : 'configuracion/tipousuarios',
        component: TipoUsuariosComponent,
        canActivate: [GuardallGuard],
        resolve  : {
            data: TipoUsuariosService
        }
    },
    { 
        path     : 'tipousuarios/:id',
        component: TipoUsuarioComponent,
        canActivate: [GuardallGuard],
    },
    
];


@NgModule({ 
    declarations: [
        TipoUsuariosComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatSortModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        NgxChartsModule,
        FuseSharedModule,
        FuseWidgetModule,

        // TranslateModule

  
    ],
    exports     : [
        TipoUsuariosComponent
    ],
    providers : [
        TipoUsuariosService
    ]
})

// tslint:disable-next-line: class-name
export class TipoUsuariosModule
{
}
