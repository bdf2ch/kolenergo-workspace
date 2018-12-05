import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSelectChange } from '@angular/material';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';
import { OperativeSituationService } from '../../services/operative-situation.service';
import { OperativeSituationReport } from '../../models/operative-situation-report.model';
import { ReportEditDialogComponent } from '../report-edit-dialog/report-edit-dialog.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.less']
})
export class ReportListComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              public readonly osr: OperativeSituationService) { }

  ngOnInit() {
  }

  selectCompany(event: MatSelectChange) {
    this.osr.selectedCompany(event.value);
    this.osr.fetchReports(event.value.id).subscribe();
  }

  selectReport(report: OperativeSituationReport) {
    this.osr.selectedReport(report.id);
    this.dialog.open(
      ReportEditDialogComponent, {
        width: '950px'
      }
    );
  }

  openAddReportDialog() {
    this.dialog.open(ReportAddDialogComponent, {
      width: '950px'
    });
  }

}
