import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent, AuthenticationService } from '@kolenergo/lib';
import {AhoRequestsService} from '../shared/services/aho-requests.service';

@Component({
  selector: 'app-aho-requests',
  templateUrl: './aho-requests.component.html',
  styleUrls: ['./aho-requests.component.less']
})
export class AhoRequestsComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              public readonly authenticationService: AuthenticationService,
              public ahoRequestsService: AhoRequestsService) {}

  ngOnInit() {}

  openAuthDialog(): void {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    });
  }

  logOut(): void {
    this.authenticationService.logOut();
  }

}
