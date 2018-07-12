import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '@kolenergo/lib';
import { AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../services/aho-requests.service';
import {MatSlideToggleChange, MatTableDataSource} from '@angular/material';
import { NewRequestComponent } from '../new-request/new-request.component';
import { AhoRequestComponent } from '../request/aho-request.component';
import { AhoRequest } from '../../models/aho-request.model';
import { AhoRequestFilter } from '../../models/aho-request-filter.model';
import { ShowCompletedRequestsPipe } from "../../pipes/show-completed-requests.pipe";

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
              public readonly authenticationService: AuthenticationService,
              public readonly aho: AhoRequestsService,
              private readonly showCompletedRequestsPipe: ShowCompletedRequestsPipe) {
    this.dataSource = new MatTableDataSource<AhoRequest>(this.aho.getRequests());
  }

  ngOnInit() {
    setTimeout(() => {
      //this.aho.setSelectedRequest(null);
      this.route.params.subscribe((params: any) => {
        console.log('route params', params);
        if (params['id']) {
          this.dialog.open(AhoRequestComponent, {
            width: '550px',
            height: '620px'
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
    this.authenticationService.logOut();
  }

  openNewRequestDialog() {
    this.dialog.open(NewRequestComponent, {
      width: '500px'
    });
  }

  selectRequest(request: AhoRequest) {
    console.log(request);
    //this.aho.setSelectedRequest(request);
    this.router.navigate(['/request', request.id]);
  }

  showEmployeeRequests() {
    this.aho.filters_.resetFilters();
    this.aho.showEmployeeRequests();
  }

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
      this.aho.filters_.getFilterByTitle('startDate').getValue() ? this.aho.filters_.getFilterByTitle('startDate').getValue() : 0,
      this.aho.filters_.getFilterByTitle('endDate').getValue() ? this.aho.filters_.getFilterByTitle('endDate').getValue().getTime() : 0,
      this.aho.filters_.getFilterByTitle('requestEmployee').getValue() ? this.aho.filters_.getFilterByTitle('requestEmployee').getValue().id : 0,
      this.aho.filters_.getFilterByTitle('requestType').getValue() ? this.aho.filters_.getFilterByTitle('requestType').getValue().id : 0,
      this.aho.filters_.getFilterByTitle('requestStatus').getValue() ? this.aho.filters_.getFilterByTitle('requestStatus').getValue().id : 0
    );
  }

  onShowCompletedRequestsToggle(value: MatSlideToggleChange) {
    this.aho.showCompletedRequests(value.checked);
  }
}
