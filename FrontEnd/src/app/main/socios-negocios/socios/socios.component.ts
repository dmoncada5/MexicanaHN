import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { SociosService } from '../socios.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SocioFormComponent } from '../socio-form/socio-form.component';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class SociosComponent implements OnInit,OnDestroy {
  
  dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

  constructor(
    private _contactsService: SociosService,
    private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog
  ) { 
      // Set the defaults
      this.searchInput = new FormControl('');

      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._contactsService.onSelectedContactsChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(selectedContacts => {
        this.hasSelectedContacts = selectedContacts.length > 0;
    });

this.searchInput.valueChanges
    .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
    )
    .subscribe(searchText => {
        this._contactsService.onSearchTextChanged.next(searchText);
    });
  }
  ngOnDestroy(): void
  {
      // Reset the search
      this._contactsService.onSearchTextChanged.next('');

      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }
  newContact(): void
  {
      this.dialogRef = this._matDialog.open(SocioFormComponent, {
          panelClass: 'contact-form-dialog', 
          data      : {
              action: 'new'
          }
      });

      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              if ( !response )
              {
                  return;
              }



              this._contactsService.addContact(response.getRawValue());
          });
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }


}
