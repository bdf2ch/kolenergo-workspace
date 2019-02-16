import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSelectChange, MatTabChangeEvent } from '@angular/material';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';
import { OperativeSituationService } from '../../services/operative-situation.service';
import { OperativeSituationReport } from '../../models/operative-situation-report.model';
import { ReportEditDialogComponent } from '../report-edit-dialog/report-edit-dialog.component';
import { ConsumptionAddDialogComponent } from '../consumption-add-dialog/consumption-add-dialog.component';
import { ConsumptionEditDialogComponent } from '../consumption-edit-dialog/consumption-edit-dialog.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.less']
})
export class ReportListComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              public readonly osr: OperativeSituationService) { }

  ngOnInit() {
    this.dialog.open(ReportAddDialogComponent, {
      width: '950px'
    });
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

  openEditReportDialog() {
    this.dialog.open(
      ReportEditDialogComponent, {
        width: '950px'
      }
    );
  }



  onSelectTimePeriod(event: MatTabChangeEvent) {
    const period = this.osr.periods()[event.index];
    const report = this.osr.getReportByTimePeriod(period);
    this.osr.selectedPeriod(period);
    this.osr.selectedReport(report ? report.id : null);
  }

  /**
   * Открытие диалогового окна добавления отчета о максимальном потреблении за прошедшие сутки
   */
  openAddConsumptionDialog() {
    this.dialog.open(ConsumptionAddDialogComponent, {
      width: '400px'
    });
  }

  /**
   * Открытие диалогового окна изменения отчета о максимальном потреблении за прошедшие сутки
   */
  openEditConsumptionDialog() {
    this.dialog.open(ConsumptionEditDialogComponent, {
      width: '400px'
    });
  }


}
