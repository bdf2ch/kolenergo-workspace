import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '@kolenergo/lib';
import { AuthenticationService } from '@kolenergo/lib';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {

  constructor(private dialog: MatDialog,
              public authenticationService: AuthenticationService) { }

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
