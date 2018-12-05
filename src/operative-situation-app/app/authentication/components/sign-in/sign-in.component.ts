import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationDialogComponent, AuthenticationService } from '@kolenergo/lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              public readonly auth: AuthenticationService) { }

  ngOnInit() {}

  openAuthenticationDialog() {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    }).afterClosed().subscribe((data: any) => {
      console.log('data', data);
      if (this.auth.getCurrentUser()) {
        if (this.auth.getCurrentUser()) {
          this.router.navigate(['/']);
        }
      }
    });
  }

}
