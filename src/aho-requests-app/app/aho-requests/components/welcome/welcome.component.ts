import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { AuthenticationDialogComponent } from '@kolenergo/lib';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(public readonly aho: AhoRequestsService,
              private readonly dialog: MatDialog) {}

  ngOnInit() {}

  openAuthDialog() {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    });
  }
}
