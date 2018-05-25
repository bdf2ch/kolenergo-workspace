import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '@kolenergo/lib';
import { AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../shared/services/aho-requests.service';
import { MatTableDataSource } from '@angular/material';
import { NewRequestComponent } from '../../shared/components/new-request/new-request.component';
import { RequestComponent } from '../request/request.component';
import { AhoRequest } from '../../shared/models/aho-request.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['requestType', 'id', 'dateCreated', 'user', 'room', 'comment', 'requestStatus'];

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly dialog: MatDialog,
              public readonly authenticationService: AuthenticationService,
              public readonly ahoRequestsService: AhoRequestsService) {
    this.dataSource = new MatTableDataSource(this.ahoRequestsService.getRequests());
  }

  ngOnInit() {
    setTimeout(() => {
      //this.ahoRequestsService.setSelectedRequest(null);
      this.route.params.subscribe((params: any) => {
        console.log('route params', params);
        if (params['id']) {
          this.dialog.open(RequestComponent, {
            width: '550px',
            minHeight: '550px',
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
    //this.ahoRequestsService.setSelectedRequest(request);
    this.router.navigate(['/request', request.id]);
  }
}
