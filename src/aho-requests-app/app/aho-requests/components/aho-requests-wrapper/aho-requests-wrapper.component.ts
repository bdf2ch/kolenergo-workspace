import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationDialogComponent, AuthenticationService } from '@kolenergo/cpa';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { environment } from '../../../../environments/environment';
import { FiltersDialogComponent } from '../filters-dialog/filters-dialog.component';
import { AhoRequestFilter } from '../../models/aho-request-filter.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aho-requests-wrapper',
  templateUrl: './aho-requests-wrapper.component.html',
  styleUrls: ['./aho-requests-wrapper.component.less']
})
export class AhoRequestsWrapperComponent implements OnInit {
  private searchInterval;

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
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
    this.auth.logOut().then(() => {
      this.router.navigate(['/welcome']);
    });
  }

  openFiltersDialog() {
    this.dialog.open(FiltersDialogComponent, {
      width: '400px'
    });
  }

  async searchChange(value: string) {
    console.log(value);
    if (value.length >= 3) {
      this.searchInterval = await setTimeout( async () => {
        if (this.aho.isSearchingRequests() || !this.auth.getCurrentUser()) {
          return;
        }
        await this.aho.searchRequests(value);
      }, 500);
    } else {
      if (!this.auth.getCurrentUser()) {
        return;
      }
      await this.aho.fetchRequests(
        0,
        0,
        this.auth.getCurrentUser().permissions.getRoleById(1) ? 0 : this.auth.getCurrentUser().id,
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
    await this.aho.cancelSearch();
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
    const filterEmployee = this.aho.filters_.getFilterByTitle('requestEmployee').getValue();
    this.aho.fetchRequests(
      this.aho.filters_.getFilterByTitle('startDate').getValue()
        ? this.aho.filters_.getFilterByTitle('startDate').getValue().getTime() : 0,
      this.aho.filters_.getFilterByTitle('endDate').getValue()
        ? this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
      (filterEmployee && filterEmployee.id === this.auth.getCurrentUser().id) || this.auth.getCurrentUser().permissions.getRoleById(1) ? 0 : this.auth.getCurrentUser().id,
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
