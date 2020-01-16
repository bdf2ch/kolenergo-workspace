import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { OperativeSituationService } from '../../services/operative-situation.service';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';
import { ICompany, AuthenticationService } from '@kolenergo/cpa';
import { Division } from '../../models/division.model';

class MatTreeNestedDataSource<T> {
}

@Component({
  selector: 'app-operative-situation',
  templateUrl: './operative-situation.component.html',
  styleUrls: ['./operative-situation.component.less']
})
export class OperativeSituationComponent implements OnInit {
  treeControl = new NestedTreeControl<Division>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Division>();


  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              public readonly auth: AuthenticationService,
              public readonly osr: OperativeSituationService) {}

  ngOnInit() {}


  selectCompany(company: ICompany) {
    this.osr.selectedCompany(company);
    this.osr.fetchReports(company.id).subscribe();
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
