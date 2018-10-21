import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationDialogComponent, AuthenticationService } from '@kolenergo/lib';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { AhoRequestsService } from '../../../aho-requests/services/aho-requests.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(private readonly auth: AuthenticationService,
              public readonly aho: AhoRequestsService,
              private readonly dialog: MatDialog,
              private readonly router: Router) {}

  ngOnInit() {}

  openAuthDialog() {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    }).afterClosed().subscribe((data: any) => {
      console.log('data', data);
      if (this.auth.getCurrentUser()) {
        if (this.auth.getCurrentUser()) {
          this.aho.fetchInitialData(this.auth.getCurrentUser().id, environment.settings.requestsOnPage);
          this.router.navigate(['/']);
        }
      }
    });
  }
}
