import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { AuthenticationService } from '@kolenergo/lib';
import {AhoRequestStatus} from "../../models/aho-request-status.model";

@Component({
  selector: 'app-request',
  templateUrl: './aho-request.component.html',
  styleUrls: ['./aho-request.component.less']
})
export class AhoRequestComponent implements OnInit {
  public isRequestChanged: boolean;
  tasks: any;

  constructor(private readonly router: Router,
              private readonly dialogRef: MatDialogRef<AhoRequestComponent>,
              public readonly authenticationService: AuthenticationService,
              public readonly ahoRequestsService: AhoRequestsService) {
    this.isRequestChanged = false;
  }

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
      this.router.navigate(['']);
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.ahoRequestsService.setSelectedRequest(null);
    });
  }

  selectEmployee(value: any) {
    console.log(value);
    this.isRequestChanged = true;
  }

  completeTask(value: any) {
    console.log(value);
    this.isRequestChanged = true;
  }

  async deleteRequest() {
    await this.ahoRequestsService.deleteRequest(this.ahoRequestsService.getSelectedRequest().id)
      .then(() => {
        this.dialogRef.close();
      });
  }

  async editRequest() {
    if (this.ahoRequestsService.getSelectedRequest().isAllTasksCompleted()) {
      const findStatusById = (status: AhoRequestStatus) => status.id === 3;
      const status = this.ahoRequestsService.getRequestStatuses().find(findStatusById);
      this.ahoRequestsService.getSelectedRequest().status = status;
    }
    /*
    await this.ahoRequestsService.editRequest(this.ahoRequestsService.getSelectedRequest())
      .then(() => {
        this.dialogRef.close();
      });
      */
    }


}
