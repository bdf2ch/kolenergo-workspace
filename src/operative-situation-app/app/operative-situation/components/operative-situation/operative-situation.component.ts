import { Component, OnInit } from '@angular/core';
import { OperativeSituationService } from '../../services/operative-situation.service';
import {MatDialog, MatSelectChange} from '@angular/material';
import {ReportAddDialogComponent} from '../report-add-dialog/report-add-dialog.component';

@Component({
  selector: 'app-operative-situation',
  templateUrl: './operative-situation.component.html',
  styleUrls: ['./operative-situation.component.less']
})
export class OperativeSituationComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              public readonly reports: OperativeSituationService) { }

  ngOnInit() {}


  selectCompany(event: MatSelectChange) {
    this.reports.selectedCompany(event.value);
    this.reports.fetchReports(event.value.id).subscribe();
  }

  openAddReportDialog() {
    this.dialog.open(ReportAddDialogComponent, {
      width: '500px'
    });
  }
}
