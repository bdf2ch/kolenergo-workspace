import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '@kolenergo/lib';
import { AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../shared/services/aho-requests.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['id', 'userId', 'comment', 'dateCreated'];

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

}
