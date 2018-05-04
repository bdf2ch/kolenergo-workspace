import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationComponent } from '../../shared-lib/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }


  openAuthDialog(): void {
    this.dialog.open(AuthenticationComponent, {
      width: '350px'
    });
  }
}
