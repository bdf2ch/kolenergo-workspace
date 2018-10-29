import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '../../shared-lib/api';
import { AuthenticationService } from '../../shared-lib/app/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private authenticationService: AuthenticationService) { }

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