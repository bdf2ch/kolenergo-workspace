import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSelectChange } from '@angular/material';
import { Router } from '@angular/router';
import { OperativeSituationService } from '../../services/operative-situation.service';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';
import { AuthenticationService } from '@kolenergo/lib';

@Component({
  selector: 'app-operative-situation',
  templateUrl: './operative-situation.component.html',
  styleUrls: ['./operative-situation.component.less']
})
export class OperativeSituationComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              public readonly auth: AuthenticationService,
              public readonly reports: OperativeSituationService) { }

  ngOnInit() {}


  selectCompany(event: MatSelectChange) {
    this.reports.selectedCompany(event.value);
    this.reports.fetchReports(event.value.id).subscribe();
  }

  openAddReportDialog() {
    this.dialog.open(ReportAddDialogComponent, {
      width: '850px'
    });
  }

  logOut() {
    this.auth.logOut().then(() => {
      this.router.navigate(['/auth']);
    });
  }
}
