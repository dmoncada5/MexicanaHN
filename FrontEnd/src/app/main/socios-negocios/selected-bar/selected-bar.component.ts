import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { SociosService } from '../socios.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-selected-bar',
  templateUrl: './selected-bar.component.html',
  styleUrls: ['./selected-bar.component.scss']
})
export class SelectedBarComponent  implements OnInit, OnDestroy
 {
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  hasSelectedContacts: boolean;
  isIndeterminate: boolean;
  selectedContacts: string[];

  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(  private _contactsService: SociosService,
    public _matDialog: MatDialog) {
      this._unsubscribeAll = new Subject();
     }

  ngOnInit(): void {
    this._contactsService.onSelectedContactsChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(selectedContacts => {
        this.selectedContacts = selectedContacts;
        setTimeout(() => {
            this.hasSelectedContacts = selectedContacts.length > 0;
            this.isIndeterminate = (selectedContacts.length !== this._contactsService.contacts.length && selectedContacts.length > 0);
        }, 0);
    });
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }
  selectAll(): void
  {
      this._contactsService.selectContacts();
  }

  /**
   * Deselect all
   */
  deselectAll(): void
  {
      this._contactsService.deselectContacts();
  }

  /**
   * Delete selected contacts
   */
  deleteSelectedContacts(): void
  {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';

      this.confirmDialogRef.afterClosed()
          .subscribe(result => {
              if ( result )
              {
                  this._contactsService.deleteSelectedContacts();
              }
              this.confirmDialogRef = null;
          });
  }
}
