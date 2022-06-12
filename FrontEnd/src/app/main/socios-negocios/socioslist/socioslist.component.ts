import { Component, OnInit,ViewEncapsulation, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { SociosService } from '../socios.service';
import { fuseAnimations } from '../../../../@fuse/animations';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfirmDialogComponent } from '../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {SocioFormComponent} from '../socio-form/socio-form.component'
@Component({
  selector: 'app-socioslist',
  templateUrl: './socioslist.component.html',
  styleUrls: ['./socioslist.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class SocioslistComponent implements OnInit, OnDestroy {
  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;

  contacts: any;
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['csocio','nombre','rtn','telefono','estado','buttons'];
  selectedContacts: any[];
  checkboxes: {};
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  // Private
  private _unsubscribeAll: Subject<any>;


  constructor(
    private _contactsService:SociosService,
    public _matDialog: MatDialog
  ) {      
    this._unsubscribeAll = new Subject(); }

  ngOnInit(): void {

    this.dataSource = new FilesDataSource(this._contactsService);
 
    this._contactsService.onContactsChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(contacts => {
      
            this.contacts = contacts;
               this.checkboxes = {};
            contacts.map(contact => {
                this.checkboxes[contact.csocio] = false;
            });
        });

    this._contactsService.onSelectedContactsChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(selectedContacts => {
            for ( const id in this.checkboxes )
            {
                if ( !this.checkboxes.hasOwnProperty(id) )
                {
                    continue;
                }

                this.checkboxes[id] = selectedContacts.includes(id);
            }
            this.selectedContacts = selectedContacts;
        });

    this._contactsService.onUserDataChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(user => {
            this.user = user;
            
        });

    this._contactsService.onFilterChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => {
            this._contactsService.deselectContacts();
        });
  }
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  editContact(contact): void
  {
      this.dialogRef = this._matDialog.open(SocioFormComponent, {
          panelClass: 'contact-form-dialog',
          data      : {
              contact: contact,
              action : 'edit'
          }
      });

      this.dialogRef.afterClosed()
          .subscribe(response => {
              if ( !response )
              {
                  return;
              }
              const actionType: string = response[0];
              const formData: FormGroup = response[1];
              switch ( actionType )
              {
                  /**
                   * Save
                   */
                  case 'save':

                      this._contactsService.updateContact(formData.getRawValue());

                      break;
                  /**
                   * Delete
                   */
                  case 'delete':

                      this.deleteContact(contact,formData.getRawValue(),1);
              

                      break;
              }
          });
  }

  /**
   * Delete Contact
   */
  deleteContact(contact,formData,valor=0): void
  {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if ( result )
          {
            //   console.log(formData)
            if (valor===1){
                this._contactsService.deleteContact(formData);

            }else{
                this._contactsService.deleteContact(contact);

            }
          }
          this.confirmDialogRef = null;
      });

  }

  /** 
   * On selected change
   *
   * @param contactId
   */
  onSelectedChange(contactId): void
  {
      this._contactsService.toggleSelectedContact(contactId);
  }

  /**
   * Toggle star
   *
   * @param contactId
   */
  toggleStar(contactId): void
  {
      if ( this.user.starred.includes(contactId) )
      {
          this.user.starred.splice(this.user.starred.indexOf(contactId), 1);
      }
      else
      {
          this.user.starred.push(contactId);
      }

      this._contactsService.updateUserData(this.user);
  }
}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * 
   */
  constructor(
      private _contactsService: SociosService
  )
  {
      super();
  }


  connect(): Observable<any[]>
  {
      return this._contactsService.onContactsChanged;
  }

  disconnect(): void
  {
  }

}
