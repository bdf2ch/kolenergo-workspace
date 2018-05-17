import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '@kolenergo/lib';
import { AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../shared/services/aho-requests.service';
import { MatTableDataSource } from '@angular/material';
import { NewRequestComponent } from '../../shared/components/new-request/new-request.component';
import { AhoRequest } from '../../shared/models/aho-request.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['requestType', 'id', 'dateCreated', 'user', 'room', 'comment', 'requestStatus'];

  constructor(private dialog: MatDialog,
              public authenticationService: AuthenticationService,
              public ahoRequestsService: AhoRequestsService) {
    this.dataSource = new MatTableDataSource(this.ahoRequestsService.getRequests());
  }

  ngOnInit() {
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
    this.ahoRequestsService.setSelectedRequest(request);
  }
}
