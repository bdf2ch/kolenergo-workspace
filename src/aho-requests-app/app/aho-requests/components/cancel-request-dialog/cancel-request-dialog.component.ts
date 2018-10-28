import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { AhoRequestsService } from '../../services/aho-requests.service';

@Component({
  selector: 'app-cancel-request-dialog',
  templateUrl: './cancel-request-dialog.component.html',
  styleUrls: ['./cancel-request-dialog.component.less']
})
export class CancelRequestDialogComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly dialogRef: MatDialogRef<CancelRequestDialogComponent>,
              public readonly aho: AhoRequestsService) { }

  ngOnInit() {}

  /**
   * Отмена заявки
   */
  async cancelRequest() {
    await this.aho.cancelRequest(this.aho.getSelectedRequest())
      .then(() => {
        this.dialogRef.close();
        this.router.navigate(['']);
      });
  }
}
