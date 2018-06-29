import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '@kolenergo/lib';
import { AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { MatTableDataSource } from '@angular/material';
import { NewRequestComponent } from '../new-request/new-request.component';
import { AhoRequestComponent } from '../request/aho-request.component';
import { AhoRequest } from '../../models/aho-request.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['requestType', 'id', 'dateCreated', 'user', 'room', 'description', 'employee', 'requestStatus'];

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly dialog: MatDialog,
              public readonly authenticationService: AuthenticationService,
              public readonly aho: AhoRequestsService) {
    this.dataSource = new MatTableDataSource(this.aho.getRequests());
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
    this.aho.showEmployeeRequests();
  }

  async exportRequests() {
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
    this.aho.fetchRequestsExport(
      this.aho.filters.startDate.value ? this.aho.filters.startDate.value.getTime() : 0,
      this.aho.filters.endDate.value ? this.aho.filters.endDate.value.getTime() : 0,
      this.aho.filters.employee.value ? this.aho.filters.employee.value.id : 0,
      this.aho.filters.requestType.value ? this.aho.filters.requestType.value.id : 0,
      this.aho.filters.requestStatus.value ? this.aho.filters.requestStatus.value.id : 0
    );
  }
}
