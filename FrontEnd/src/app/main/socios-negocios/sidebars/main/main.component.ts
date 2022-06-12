import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SociosService } from '../../socios.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnDestroy {
  user: any;
  filterBy: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * 
   */
  constructor(private sociosS:SociosService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterBy = this.sociosS.filterBy || 'all';

    this.sociosS.onUserDataChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(user => {
            this.user = user;
        });
  }
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  changeFilter(filter): void
  {
      this.filterBy = filter;
      this.sociosS.onFilterChanged.next(this.filterBy);
  }
}
