import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent implements OnInit {
  public now: Date;

  constructor(private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<FiltersComponent>,
              public readonly aho: AhoRequestsService) {
    this.now = new Date();
  }

  ngOnInit() {}

  changeStartDate(date: any) {
    console.log(date.value);
    this.aho.filters_.getFilterByTitle('startDate').setValue(date.value);
  }

  changeEndDate(date: any) {
    console.log(date.value);
    this.aho.filters_.getFilterByTitle('endDate').setValue(date.value);
  }

  applyFilters() {
    console.log(this.aho.filters_);
    if (this.aho.filters_.getFilterByTitle('startDate').getValue()) {
      this.aho.filters_.getFilterByTitle('startDate').getValue().setHours(0);
      this.aho.filters_.getFilterByTitle('startDate').getValue().setMinutes(0);
      this.aho.filters_.getFilterByTitle('startDate').getValue().setSeconds(0);
    }

    if (this.aho.filters_.getFilterByTitle('endDate').getValue()) {
      this.aho.filters_.getFilterByTitle('endDate').getValue().setHours(23);
      this.aho.filters_.getFilterByTitle('endDate').getValue().setMinutes(59);
      this.aho.filters_.getFilterByTitle('endDate').getValue().setSeconds(59);
    }
    this.aho.getPagination().setPage(0);
    this.aho.fetchRequests(
      this.aho.filters_.getFilterByTitle('startDate').getValue()
        ? this.aho.filters_.getFilterByTitle('startDate').getValue().getTime() : 0,
      this.aho.filters_.getFilterByTitle('endDate').getValue()
        ? this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
      this.aho.filters_.getFilterByTitle('requestEmployee').getValue()
        ? this.aho.filters_.getFilterByTitle('requestEmployee').getValue().id : 0,
      this.aho.filters_.getFilterByTitle('requestType').getValue()
        ? this.aho.filters_.getFilterByTitle('requestType').getValue().id : 0,
      this.aho.filters_.getFilterByTitle('requestStatus').getValue()
        ? this.aho.filters_.getFilterByTitle('requestStatus').getValue().id : 0,
      false,
      0,
      environment.settings.requestsOnPage,
      true
    ).then(() => {
      this.dialogRef.close();
    });
  }

  cancelFilters() {
    /*
    for (const filter in this.aho.filters) {
      this.aho.filters[filter].clear();
    }
    */
    this.aho.filters_.resetFilters();

    this.aho.fetchRequests(
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
    console.log(this.aho.filters_);
  }
}
