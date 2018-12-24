import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationDialogComponent, AuthenticationService } from '@kolenergo/cpa';
import { Router } from '@angular/router';
import { OperativeSituationService } from '../../../operative-situation/services/operative-situation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              public readonly auth: AuthenticationService,
              private osr: OperativeSituationService) { }

  ngOnInit() {}

  openAuthenticationDialog() {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    }).afterClosed().subscribe((data: any) => {
      if (this.auth.getCurrentUser()) {
        if (this.auth.getCurrentUser()) {
          this.osr.selectedCompany(this.auth.getCurrentUser().company);
          this.router.navigate(['/']);
        }
      }
    });
  }

}
