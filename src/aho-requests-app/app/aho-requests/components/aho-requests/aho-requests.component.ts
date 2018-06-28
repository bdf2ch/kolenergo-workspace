import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent, AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { FiltersComponent } from "../filters/filters.component";

@Component({
  selector: 'app-aho-requests',
  templateUrl: './aho-requests.component.html',
  styleUrls: ['./aho-requests.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AhoRequestsComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              public readonly authenticationService: AuthenticationService,
              public readonly aho: AhoRequestsService) {}

  ngOnInit() {}

  openAuthDialog(): void {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '350px'
    }).afterClosed().subscribe((data: any) => {
      console.log('data', data);
      if (this.authenticationService.getCurrentUser()) {
        this.aho.fetchRequestsByEmployeeId(this.authenticationService.getCurrentUser().id);
      }
    });
  }

 async getNewRequests() {
    await this.aho.fetchRequestsByStatusId(1);
  }

  logOut(): void {
    this.authenticationService.logOut();
  }

  filtersDialog() {
    this.dialog.open(FiltersComponent, {
      width: '400px'
    });
  }

}
