import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent, AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../services/aho-requests.service';

@Component({
  selector: 'app-aho-requests',
  templateUrl: './aho-requests.component.html',
  styleUrls: ['./aho-requests.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AhoRequestsComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              public readonly authenticationService: AuthenticationService,
              public readonly ahoRequestsService: AhoRequestsService) {}

  ngOnInit() {}

  openAuthDialog(): void {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    });
  }

 async getNewRequests() {
    await this.ahoRequestsService.fetchRequestsByStatusId(1);
  }

  logOut(): void {
    this.authenticationService.logOut();
  }

}
