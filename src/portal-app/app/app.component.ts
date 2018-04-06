import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthDialogComponent } from './shared/components/auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  authData = {
    account: '',
    password: ''
  };

  constructor(private dialog: MatDialog) {
    this.authData.account = 'kolu0897';
    this.authData.password = 'test';
  }

  openAuthDialog() {
      this.dialog.open(AuthDialogComponent, {
        width: '350px',
        data: this.authData
      });
  }
}
