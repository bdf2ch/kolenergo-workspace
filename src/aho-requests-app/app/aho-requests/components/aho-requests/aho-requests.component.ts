import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent, AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { FiltersComponent } from '../filters/filters.component';
import { AhoRequestFilter } from '../../models/aho-request-filter.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-aho-requests',
  templateUrl: './aho-requests.component.html',
  styleUrls: ['./aho-requests.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AhoRequestsComponent implements OnInit {
  // public search: string;
  private searchInterval;

  constructor(private readonly dialog: MatDialog,
              public readonly auth: AuthenticationService,
              public readonly aho: AhoRequestsService) {
    // this.search = '';
  }

  ngOnInit() {}

  openAuthDialog(): void {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    }).afterClosed().subscribe((data: any) => {
      console.log('data', data);
      if (this.auth.getCurrentUser()) {
        if (this.auth.getCurrentUser()) {
          this.aho.fetchInitialData(this.auth.getCurrentUser().id, environment.settings.requestsOnPage);
        }
      }
    });
  }

  async getNewRequests() {
    await this.aho.fetchRequestsByStatusId(1);
  }

  logOut(): void {
    this.auth.logOut();
  }

  openFiltersDialog() {
    this.dialog.open(FiltersComponent, {
      width: '400px'
    });
  }

  async searchChange(value: string) {
    console.log(value);
    if (value.length >= 3) {
      this.searchInterval = await setTimeout( async () => {
        if (this.aho.isSearchingRequests()) {
          return;
        }
        await this.aho.searchRequests(value);
      }, 500);
    } else {
      await this.aho.fetchRequests(
        0,
        0,
        0,
        0,
        0,
        0,
        false,
        0,
        environment.settings.requestsOnPage,
        true
      );
    }
  }

  /**
   * Очистка результатов поиска
   * @returns {Promise<void>}
   */
  async clearSearch() {
    // this.search = '';
    await this.aho.fetchRequests(
      0,
      0,
      0,
      0,
      0,
      0,
      false,
      0,
      environment.settings.requestsOnPage,
      true
    );
  }


  clearFilter(filter: AhoRequestFilter<any>) {
    filter.clear();
    console.log(this.aho.filters_);
    if (this.aho.filters_.getFilterByTitle('startDate').getValue()) {
      this.aho.filters_.getFilterByTitle('startDate').getValue().setHours(0);
      this.aho.filters_.getFilterByTitle('startDate').getValue().setMinutes(0);
      this.aho.filters_.getFilterByTitle('startDate').getValue().setSeconds(0);
    }

    if (this.aho.filters_.getFilterByTitle('endDate').getValue()) {
      this.aho.filters_.getFilterByTitle('endDate').getValue().setHours(0);
      this.aho.filters_.getFilterByTitle('endDate').getValue().setMinutes(0);
      this.aho.filters_.getFilterByTitle('endDate').getValue().setSeconds(0);
    }
    this.aho.fetchRequests(
      this.aho.filters_.getFilterByTitle('startDate').getValue()
        ? this.aho.filters_.getFilterByTitle('startDate').getValue().getTime() : 0,
      this.aho.filters_.getFilterByTitle('endDate').getValue()
        ? this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
      this.auth.getCurrentUser() ? this.auth.getCurrentUser().id : 0,
      this.aho.filters_.getFilterByTitle('requestEmployee').getValue()
        ? this.aho.filters_.getFilterByTitle('requestEmployee').getValue().id : 0,
      this.aho.filters_.getFilterByTitle('requestType').getValue()
        ? this.aho.filters_.getFilterByTitle('requestType').getValue().id : 0,
      this.aho.filters_.getFilterByTitle('requestStatus').getValue()
        ? this.aho.filters_.getFilterByTitle('requestStatus').getValue().id : 0,
      false,
      0,
      environment.settings.requestsOnPage,
      true,
    );
  }

}
