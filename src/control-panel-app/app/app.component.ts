import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '../../shared-lib/api';
import { AuthenticationService } from '../../shared-lib/app/authentication/services/authentication.service';
import { DashboardService } from './dashboard/services/dashboard.service';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ApplicationMenuItem} from './dashboard/models/application-menu-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerListener: Subscription;

  constructor(private readonly router: Router,
              public readonly route: ActivatedRoute,
              private dialog: MatDialog,
              private authenticationService: AuthenticationService,
              public readonly dashboard: DashboardService) {
  }

  ngOnInit() {}

  ngOnDestroy() {}


  openAuthDialog(): void {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    });
  }


  logOut(): void {
    this.authenticationService.logOut();
  }
}
