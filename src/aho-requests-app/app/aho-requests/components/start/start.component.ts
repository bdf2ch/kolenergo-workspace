import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService, AuthenticationDialogComponent } from '@kolenergo/cpa';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { MatSlideToggleChange, MatTableDataSource } from '@angular/material';
import { NewRequestDialogComponent } from '../new-request-dialog/new-request-dialog.component';
import { RequestDetailsDialogComponent } from '../request-details-dialog/request-details-dialog.component';
import { AhoRequest } from '../../models/aho-request.model';
import { ShowCompletedRequestsPipe } from '../../pipes/show-completed-requests.pipe';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['requestType', 'id', 'dateCreated', 'user', 'room', 'description', 'dateExpires', 'employee', 'requestStatus'];

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly dialog: MatDialog,
              public readonly auth: AuthenticationService,
              public readonly aho: AhoRequestsService,
              private readonly showCompletedRequestsPipe: ShowCompletedRequestsPipe) {
    this.dataSource = new MatTableDataSource<AhoRequest>(this.aho.getRequests());
  }

  ngOnInit() {
    setTimeout(() => {
      // this.aho.setSelectedRequest(null);
      this.route.params.subscribe((params: any) => {
        console.log('route params', params);
        if (params['id']) {
          this.dialog.open(RequestDetailsDialogComponent, {
            width: '850px',
            // height: '700px'
            minHeight: '500px',
          });
        } else {
          this.dialog.closeAll();
        }
      });
    });


  }


  openAuthDialog(): void {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    });
  }


  logOut(): void {
    this.auth.logOut();
  }

  openNewRequestDialog() {
    this.dialog.open(NewRequestDialogComponent, {
      width: '800px'
    });
  }

  selectRequest(request: AhoRequest) {
    console.log(request);
    // this.aho.setSelectedRequest(request-details-dialog);
    this.router.navigate(['/request', request.id]);
  }

  /*
  showEmployeeRequests() {
    this.aho.filters_.resetFilters();
    this.aho.showEmployeeRequests();
  }
  */

  async exportRequests() {
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
    this.aho.fetchRequestsExport(
      this.aho.filters_.getFilterByTitle('startDate').getValue() ?
        this.aho.filters_.getFilterByTitle('startDate').getValue() : 0,
      this.aho.filters_.getFilterByTitle('endDate').getValue() ?
        this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
      0,
      this.aho.filters_.getFilterByTitle('requestEmployee').getValue() ?
        this.aho.filters_.getFilterByTitle('requestEmployee').getValue().id : 0,
      this.aho.filters_.getFilterByTitle('requestType').getValue() ?
        this.aho.filters_.getFilterByTitle('requestType').getValue().id : 0,
      this.aho.filters_.getFilterByTitle('requestStatus').getValue() ?
        this.aho.filters_.getFilterByTitle('requestStatus').getValue().id : 0
    );
  }

  onShowCompletedRequestsToggle(value: MatSlideToggleChange) {
    this.aho.showCompletedRequests(value.checked);
  }

  /**
   * Загрузка следующей страницы заявок
   */
  async loadNextPage() {
    console.log('IS FILTERS APPLIED', this.aho.filters_.isFiltersApplied());
    if (this.aho.filters_.isFiltersApplied()) {
      console.log('FILTERS APPLIED');
      this.aho.fetchNextPage(
        this.aho.filters_.getFilterByTitle('startDate').getValue()
          ? this.aho.filters_.getFilterByTitle('startDate').getValue() : 0,
        this.aho.filters_.getFilterByTitle('endDate').getValue()
          ? this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
        this.auth.getCurrentUser().permissions.getRoleById(1) ? 0 : this.auth.getCurrentUser().id,
        this.aho.filters_.getFilterByTitle('requestEmployee').getValue()
          ? this.aho.filters_.getFilterByTitle('requestEmployee').getValue().id : 0,
        this.aho.filters_.getFilterByTitle('requestType').getValue()
          ? this.aho.filters_.getFilterByTitle('requestType').getValue().id : 0,
        this.aho.filters_.getFilterByTitle('requestStatus').getValue()
          ? this.aho.filters_.getFilterByTitle('requestStatus').getValue().id : 0);
    } else if (this.aho.isInEmployeeRequestsMode()) {
      this.aho.fetchNextPage(
        this.aho.filters_.getFilterByTitle('startDate').getValue()
          ? this.aho.filters_.getFilterByTitle('startDate').getValue() : 0,
        this.aho.filters_.getFilterByTitle('endDate').getValue()
          ? this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
        0,
        this.auth.getCurrentUser().id,
        this.aho.filters_.getFilterByTitle('requestType').getValue()
          ? this.aho.filters_.getFilterByTitle('requestType').getValue().id : 0,
        this.aho.filters_.getFilterByTitle('requestStatus').getValue()
          ? this.aho.filters_.getFilterByTitle('requestStatus').getValue().id : 0);
    } else {
      this.aho.fetchNextPage(
        this.aho.filters_.getFilterByTitle('startDate').getValue()
          ? this.aho.filters_.getFilterByTitle('startDate').getValue() : 0,
        this.aho.filters_.getFilterByTitle('endDate').getValue()
          ? this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
        this.auth.getCurrentUser().permissions.getRoleById(1) ? 0 : this.auth.getCurrentUser().id,
        0,
        0,
        0
      );
    }



    /*
    if (this.aho.isInEmployeeRequestsMode()) {
      this.aho.fetchNextPage(
        this.aho.filters_.getFilterByTitle('startDate').getValue()
          ? this.aho.filters_.getFilterByTitle('startDate').getValue() : 0,
        this.aho.filters_.getFilterByTitle('endDate').getValue()
          ? this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
        this.auth.getCurrentUser().id,
        this.auth.getCurrentUser().id,
        this.aho.filters_.getFilterByTitle('requestType').getValue()
          ? this.aho.filters_.getFilterByTitle('requestType').getValue().id : 0,
        this.aho.filters_.getFilterByTitle('requestStatus').getValue()
          ? this.aho.filters_.getFilterByTitle('requestStatus').getValue().id : 0);
    } else {
      this.aho.fetchNextPage(
        this.aho.filters_.getFilterByTitle('startDate').getValue()
          ? this.aho.filters_.getFilterByTitle('startDate').getValue() : 0,
        this.aho.filters_.getFilterByTitle('endDate').getValue()
          ? this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
        this.auth.getCurrentUser().id,
        this.aho.filters_.getFilterByTitle('requestEmployee').getValue()
          ? this.aho.filters_.getFilterByTitle('requestEmployee').getValue().id : 0,
        this.aho.filters_.getFilterByTitle('requestType').getValue()
          ? this.aho.filters_.getFilterByTitle('requestType').getValue().id : 0,
        this.aho.filters_.getFilterByTitle('requestStatus').getValue()
          ? this.aho.filters_.getFilterByTitle('requestStatus').getValue().id : 0);
    }
    */
  }

  /**
   * Переход к заявкам сотрудника
   */
  async showEmployeeRequests() {
    this.aho.filters_.resetFilters();
    await this.aho.fetchEmployeeRequests(this.auth.getCurrentUser().id);
  }

  /**
   * Переход к просроченным заявкам
   */
  async showExpiredRequests() {
    this.aho.filters_.resetFilters();
    await this.aho.fetchExpiredRequests(this.auth.getCurrentUser().permissions.getRoleById(1) ? 0 : this.auth.getCurrentUser().id);
  }
}
