import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AhoRequestsService } from "../../services/aho-requests.service";

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
    this.aho.filters.startDate.setValue(date.value);
  }

  changeEndDate(date: any) {
    console.log(date.value);
    this.aho.filters.endDate.setValue(date.value);
  }

  applyFilters() {
    console.log(this.aho.filters);
    if (this.aho.filters.startDate.value) {
      this.aho.filters.startDate.value.setHours(0);
      this.aho.filters.startDate.value.setMinutes(0);
      this.aho.filters.startDate.value.setSeconds(0);
    }
    if (this.aho.filters.endDate.value) {
      this.aho.filters.endDate.value.setHours(23);
      this.aho.filters.endDate.value.setMinutes(59);
      this.aho.filters.endDate.value.setSeconds(59);
    }
    this.aho.fetchRequests(
      this.aho.filters.startDate.value ? this.aho.filters.startDate.value.getTime() : 0,
      this.aho.filters.endDate.value ? this.aho.filters.endDate.value.getTime() : 0,
      this.aho.filters.employee.value ? this.aho.filters.employee.value.id : 0,
      this.aho.filters.requestType.value ? this.aho.filters.requestType.value.id : 0,
      this.aho.filters.requestStatus.value ? this.aho.filters.requestStatus.value.id : 0
    ).then(() => {
      this.dialogRef.close();
    });
  }

  cancelFilters() {
    for (const filter in this.aho.filters) {
      this.aho.filters[filter].clear();
    }
    this.aho.fetchRequests(
      this.aho.filters.startDate.value ? this.aho.filters.startDate.value.getTime() : 0,
      this.aho.filters.endDate.value ? this.aho.filters.endDate.value.getTime() : 0,
      this.aho.filters.employee.value ? this.aho.filters.employee.value.id : 0,
      this.aho.filters.requestType.value ? this.aho.filters.requestType.value.id : 0,
      this.aho.filters.requestStatus.value ? this.aho.filters.requestStatus.value.id : 0
    );
    console.log(this.aho.filters);
  }
}
