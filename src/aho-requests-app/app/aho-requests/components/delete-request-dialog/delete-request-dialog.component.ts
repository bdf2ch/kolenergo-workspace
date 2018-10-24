import { Component, OnInit } from '@angular/core';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-request',
  templateUrl: './delete-request-dialog.component.html',
  styleUrls: ['./delete-request-dialog.component.less']
})
export class DeleteRequestDialogComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly dialogRef: MatDialogRef<DeleteRequestDialogComponent>,
              public readonly aho: AhoRequestsService) { }

  ngOnInit() {}

  /**
   * Удаление заявки
   */
  async deleteRequest() {
    await this.aho.deleteRequest(this.aho.getSelectedRequest().id)
      .then(() => {
        this.dialogRef.close();
        this.router.navigate(['']);
      });
  }
}
